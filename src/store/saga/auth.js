import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions/index'
import { API_KEY } from '../../keys/firebaseKey'

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], "token")
    yield localStorage.removeItem('expiryTime')
    yield localStorage.removeItem('userId')
    yield put(actions.authLogoutSucceed())
}

export function* checkExpireTimeSaga(action) {
    yield delay(action.expireTime)
    yield put(actions.authLogout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    const authBody = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    if (!action.isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    }

    try {
        const res = yield axios.post(url, authBody)

        yield localStorage.setItem('token', res.data.idToken)
        yield localStorage.setItem('expiryTime', new Date(new Date().getTime() + res.data.expiresIn * 1000))
        yield localStorage.setItem('userId', res.data.localId)
        yield put(actions.authSuccess(res.data.idToken, res.data.localId))
        yield put(actions.checkExpireTime(res.data.expiresIn))
    }
    catch (err) {
        yield put(actions.authFail(err.response.data.error))
    }
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token')
    if (!token) {
        yield put(actions.authLogout())
    }
    else {
        const expiryTime = new Date(localStorage.getItem('expiryTime'))
        if (expiryTime <= new Date()) {
            yield put(actions.authLogout())
        }
        else {
            yield put(actions.authSuccess(token, localStorage.getItem('userId')))
            yield put(actions.checkExpireTime((expiryTime.getTime() - new Date().getTime()) / 1000))
        }
    }
}