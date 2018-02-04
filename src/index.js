import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import projects from './data'
import { firebase } from './firebaseBackend/core'
import auth from './firebaseBackend/auth'
import firebaseApiMiddleware from './middleware/firebaseApi'
import App from './App'

import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  projects,
  composeWithDevTools(applyMiddleware(thunk, firebaseApiMiddleware(firebase)))
)

ReactDOM.render(
  <Provider store={store}>
    <App auth={auth(firebase)} />
  </Provider>,
  document.getElementById('root')
)

firebase.auth().onAuthStateChanged(async user => {
  console.log('auth state changed')
  console.log(user)
})

registerServiceWorker()
