import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: localId
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiryTime')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkExpireTime = expireTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, +expireTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authBody = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnuY_UzaaHRJqqwyf9YLh3b6ozJLDtTi4'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnuY_UzaaHRJqqwyf9YLh3b6ozJLDtTi4'
        }

        axios.post(url, authBody)
            .then(res => {
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expiryTime', new Date(new Date().getTime() + res.data.expiresIn * 1000))
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkExpireTime(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const authRedirectPath = path => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(authLogout())
        }
        else {
            const expiryTime = new Date(localStorage.getItem('expiryTime'))
            if (expiryTime <= new Date()) {
                dispatch(authLogout())
            }
            else {
                dispatch(authSuccess(token, localStorage.getItem('userId')))
                dispatch(checkExpireTime((expiryTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}