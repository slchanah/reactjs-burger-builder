import { takeEvery, all } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkExpireTimeSaga, authUserSaga, authCheckStateSaga } from './auth'

export function* watchAuth() {
    // concurrency
    yield all([
        takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkExpireTimeSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE_INIT, authCheckStateSaga)
    ])
}