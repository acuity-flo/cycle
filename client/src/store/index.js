import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//initial state will be an empty object, state will always be a user
const initialState = {
  authUser: {},
  statusMessage: null
};

//action
const AUTH_USER = 'AUTH_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_VIEW = 'UPDATE_VIEW';
const GET_STATUS = 'GET_STATUS'

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

const getStatus = (message) => ({
  type: GET_STATUS, 
  message
})

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
    const res = await axios.post(`/auth/${type}`, post)
    console.log("res",res)
    
    if(res.data){
      const action = authUserAction(res.data);
      dispatch(action)
    }
    
    // const action = authUserAction(data);
    // dispatch(action);
    // history.push('/me')
  } catch (e) {
    if(e.response.status === 400){
      console.log("invalid Password")
    }
    if(e.response.status === 403){
      console.log("invalid email")
    }

  }
};

// todayDataIdx
export const updateUserThunk = (update) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/${update.username}`, update);
    dispatch(updateUser(data));
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

export const authMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/me');
    const action = authUserAction(data || initialState.authUser);
    dispatch(action);
  } catch (e) {
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
        return { ...state, statusMessage: null, authUser: {...state.authUser, periodTracking: action.bool } }
      if (action.name === 'symptom')
      return { ...state, statusMessage: null, authUser: {...state.authUser, symptomTracking: action.bool} }
      if (action.name === 'finance')
      return { ...state, statusMessage: null, authUser: {...state.authUser, financialTracking: action.bool} }      
    }
    case AUTH_USER:
      return { ...state, statusMessage: null, authUser: action.user }
    case LOGOUT_USER:
      return initialState;
    case UPDATE_USER:
      return { ...state, statusMessage: null, authUser: action.user }
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
