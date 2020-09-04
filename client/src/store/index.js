import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { Store } from 'express-session';

//initial state will be an empty object, state will always be a user
const initialState = {
  authUser: {},
  statusMessage: null,
};

//action
const AUTH_USER = 'AUTH_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_VIEW = 'UPDATE_VIEW';
const SET_STATUS = 'SET_STATUS';
const GET_STATUS = 'GET_STATUS';
const UPDATE_PROFILE = 'UPDATE_PROFILE';

//action creator
const authUserAction = (user) => ({
  type: AUTH_USER,
  user,
});

const logoutUser = () => ({
  type: LOGOUT_USER,
});

const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

const updateView = (name, bool) => ({
  type: UPDATE_VIEW,
  name,
  bool,
});

const setStatus = (message) => ({
  type: SET_STATUS,
  message,
});
const updateProfile = (user) => ({
  type: UPDATE_PROFILE,
  user,
});

//thunks
//auth user thunk for login or signup
export const authUserThunk = (user, type) => async (dispatch) => {
  let post;
  if (type === 'signup') {
    const {
      email,
      password,
      username,
      name,
      pronouns,
      avgLengthOfCycle,
    } = user;
    post = {
      email,
      password,
      username,
      name,
      pronouns,
      avgLengthOfCycle: avgLengthOfCycle ? avgLengthOfCycle : 28,
    };
  }
  if (type === 'login') {
    const { email, password } = user;
    post = {
      email,
      password,
    };
  }
  try {
    const res = await axios.post(`/auth/${type}`, post);
    console.log('res', res);

    if (res.data) {
      const action = authUserAction(res.data);
      dispatch(action);
    }
  } catch (e) {
    if (e.response.status === 400) {
      dispatch(setStatus("Password entered doesn't match!"));
    }

    if (e.response.status === 435) {
      dispatch(setStatus('Sorry, this Username is already taken!'));
    }
    if (e.response.status === 437) {
      dispatch(setStatus('Oops, this Email is already registered!'));
    }

    if (e.response.status === 403) {
      dispatch(setStatus("Sorry, we don't have this email on file!"));
    }
  }
};

export const updateUserThunk = (update) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/${update.username}`, update);
    dispatch(updateUser(data));
  } catch (e) {
    console.log(e);
  }
};

export const updateProfileThunk = (update) => async (dispatch) => {
  try {
    console.log('update in thunk', update);
    const { data } = await axios.put(`/api/${update.username}/profile`, update);
    dispatch(updateProfile(data));
    return '';
  } catch (e) {
    console.log(e);
  }
};

export const updateViewThunk = (username, name, bool) => async (dispatch) => {
  try {
    dispatch(updateView(name, bool));
    const { data } = await axios.put(`/api/${username}/views`, {
      name,
      bool,
    });
    dispatch(updateUser(data));
  } catch (e) {
    console.log(e);
  }
};

//get user if req.user
export const authMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/me');
    const action = authUserAction(data || initialState.authUser);

    if (data) {
      console.log('I am in the if in redux indexdb')
      let request = indexedDB.open('CYCLE_EXAMPLE', 1), db, tx, store;

      request.onupgradeneeded = function(event) {
        db = request.result
        store = db.createObjectStore("CYCLE_STORE", {keyPath: "username"})
      }
      request.onsuccess = function(event) {
          console.log('redux, db open successful')
          console.log('[onsuccess]', request.result);
          db = request.result
          tx = db.transaction('CYCLE_STORE', 'readwrite')
          store = tx.objectStore('CYCLE_STORE')

          db.onerror = function(event) {
            console.log('CYCLE_STORE ERROR', event.target.errorCode)
          }
          store.put(data)

          tx.oncomplete = function() {
            db.close()
          }
      };
      request.onerror = function(event) {
          console.log('[onerror]', request.error);
      };
      dispatch(action);
    } else {
      console.log('i am in the else indexdb request in redux')
      let request = indexedDB.open('CYCLE_EXAMPLE', 1), db, tx, store;

      request.onsuccess = function(event) {
          console.log('redux, db open successful')
          console.log('[onsuccess]', request.result);
          db = request.result
          tx = db.transaction('CYCLE_STORE', 'readwrite')
          store = tx.objectStore('CYCLE_STORE')

          db.onerror = function(event) {
            console.log('CYCLE_STORE ERROR', event.target.errorCode)
          }
          let userDataRequest = store.get("cherisecycles")

          userDataRequest.onsuccess = function() {
            dispatch(authUserAction(userDataRequest.result));
          }
          tx.oncomplete = function() {
            db.close()
          }
      };
    }
  } catch (e) {
    console.log('I hit an error in redux auth me')
    console.log(e);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(logoutUser());
  } catch (err) {
    console.error(err);
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VIEW: {
      if (action.name === 'period')
        return {
          ...state,
          statusMessage: null,
          authUser: { ...state.authUser, periodTracking: action.bool },
        };
      if (action.name === 'symptom')
        return {
          ...state,
          statusMessage: null,
          authUser: { ...state.authUser, symptomTracking: action.bool },
        };
      if (action.name === 'finance')
        return {
          ...state,
          statusMessage: null,
          authUser: { ...state.authUser, financialTracking: action.bool },
        };
    }
    case UPDATE_PROFILE:
      return { ...state, statusMessage: null, authUser: action.user };
    case AUTH_USER:
      return { ...state, statusMessage: null, authUser: action.user };
    case LOGOUT_USER:
      return initialState;
    case UPDATE_USER:
      return { ...state, statusMessage: null, authUser: action.user };
    case SET_STATUS:
      return { ...state, statusMessage: action.message };
    default:
      return state;
  }
};

let middleware;

if (process.env.NODE_ENV !== 'development') {
  middleware = applyMiddleware(thunkMiddleware);
} else {
  middleware = applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  );
}

export default createStore(reducer, middleware);
