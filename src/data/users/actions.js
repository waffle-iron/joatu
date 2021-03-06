import { CALL_API } from '../actions'

export const FETCH_USERS_STARTED = 'FETCH_USERS_STARTED'
export const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
export const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

export const CREATE_USER_STARTED = 'CREATE_USER_STARTED'
export const CREATE_USER_SUCCEEDED = 'CREATE_USER_SUCCEEDED'
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED'

export const UPDATE_USER_STARTED = 'UPDATE_USER_STARTED'
export const UPDATE_USER_SUCCEEDED = 'UPDATE_USER_SUCCEEDED'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'

export const DELETE_USER_STARTED = 'DELETE_USER_STARTED'
export const DELETE_USER_SUCCEEDED = 'DELETE_USER_SUCCEEDED'
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED'

const doFetchUsers = () => ({
  [CALL_API]: {
    types: [FETCH_USERS_STARTED, FETCH_USERS_SUCCEEDED, FETCH_USERS_FAILED],
    collection: 'users'
  }
})

export const fetch = () => (dispatch, getState) => {
  return dispatch(doFetchUsers())
}

const doCreateUser = body => ({
  [CALL_API]: {
    types: [CREATE_USER_STARTED, CREATE_USER_SUCCEEDED, CREATE_USER_FAILED],
    collection: 'users',
    action: 'set',
    id: body.uid || body.id,
    body: {
      displayName: body.displayName,
      email: body.email,
      imgUrl: body.photoURL || body.imgUrl
    }
  }
})

export const create = body => (dispatch, getState) => {
  return dispatch(doCreateUser(body))
}

const doUpdateUser = (id, body) => ({
  [CALL_API]: {
    types: [UPDATE_USER_STARTED, UPDATE_USER_SUCCEEDED, UPDATE_USER_FAILED],
    collection: 'users',
    action: 'update',
    id,
    body
  }
})

export const update = (id, body) => (dispatch, getState) => {
  return dispatch(doUpdateUser(id, body))
}

const doDeleteUser = id => ({
  [CALL_API]: {
    types: [DELETE_USER_STARTED, DELETE_USER_SUCCEEDED, DELETE_USER_FAILED],
    collection: 'users',
    action: 'delete',
    id
  }
})

export const remove = id => (dispatch, getState) => {
  return dispatch(doDeleteUser(id))
}
