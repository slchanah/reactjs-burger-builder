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
    // localStorage.removeItem('token')
    // localStorage.removeItem('expiryTime')
    // localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_INIT_LOGOUT
    }
}

export const authLogoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkExpireTime = expireTime => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expireTime: expireTime * 1000
    }
}

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignUp
    }
}

export const authRedirectPath = path => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE_INIT
    }
}