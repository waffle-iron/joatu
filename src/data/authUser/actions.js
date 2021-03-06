import { CALL_API } from '../actions'

export const LOGIN_STARTED = 'LOGIN_STARTED'
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const AUTH_CHANGED = 'AUTH_CHANGED'

export const LOGOUT_STARTED = 'LOGOUT_STARTED'
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

// TODO Move these to sub component
export function loginUser(provider) {
  return {
    [CALL_API]: {
      types: [LOGIN_STARTED, LOGIN_SUCCEEDED, LOGIN_FAILED],
      action: 'login',
      provider
    }
  }
}

export function onLoginSuccess(user) {
  return {
    type: LOGIN_SUCCEEDED,
    payload: {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      imgUrl: user.photoURL
    }
  }
}

export function onAuthChanged(user) {
  return {
    type: AUTH_CHANGED,
    payload: {
      id: user && user.uid,
      displayName: user && user.displayName,
      email: user && user.email,
      imgUrl: user && user.photoURL
    }
  }
}

export function logoutUser() {
  return {
    [CALL_API]: {
      types: [LOGOUT_STARTED, LOGOUT_SUCCEEDED, LOGOUT_FAILED],
      action: 'logout'
    }
  }
}
