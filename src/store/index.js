import axios from 'axios'
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const AUTH_USER = 'AUTH_USER'

const authUser = (user) => ({
  type: AUTH_USER,
  user
})

export const authUserThunk = (user, type) => async dispatch => {
  let post
  console.log('type in thunk', type)
  if (type === 'signup') {
    const {email, password, username, name, pronouns} = user
    post = {
      email,
      password,
      username,
      name,
      pronouns
    }
  }
  if (type === 'login') {
    const {email, password} = user
    post = {
      email,
      password
    }
  }
  try {
    const { data } = await axios.post(`/auth/${type}`, post)
    const action = authUser(data)
    dispatch(action)
  } catch (e) {
    console.log(e)
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.user
    default:
      return state
  }
}

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))

export default createStore(reducer, middleware)
