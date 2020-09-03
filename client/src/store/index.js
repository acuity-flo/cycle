import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//initial state will be an empty object, state will always be a user
const authUser = {};

//action
const AUTH_USER = 'AUTH_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_VIEW = 'UPDATE_VIEW';

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
    const { data } = await axios.post(`/auth/${type}`, post);
    const action = authUserAction(data);
    dispatch(action);
    // history.push('/me')
  } catch (e) {
    console.log(e);
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

// export const addPeriodData = (username, periodArr) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.put(`/api/${username}`, {period: periodArr})
//       dispatch(updateUser(res.data))
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }

// export const addFinanceData = (username, financeArr) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.put(`/api/${username}`, {financial: financeArr})
//       dispatch(updateUser(res.data))
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }

// export const addSymptomData = (username, symptomArr) => {
//   console.log("symptoms arr in thunk", symptomArr)
//   return async (dispatch) => {
//     try {
//       console.log('i hit the symptom data thunk')
//       const res = await axios.put(`/api/${username}`, {symptomTags: symptomArr})
//       console.log('res.data', res.data)
//       dispatch(updateUser(res.data))
//     } catch (e) {
//       console.log(e)
//     }
//   }
// }

//get user if req.user
export const authMe = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/me');
    const action = authUserAction(data || authUser);
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

const reducer = (state = authUser, action) => {
  switch (action.type) {
    case UPDATE_VIEW: {
      if (action.name === 'period')
        return { ...state, periodTracking: action.bool };
      if (action.name === 'symptom')
        return { ...state, symptomTracking: action.bool };
      if (action.name === 'finance')
        return { ...state, financialTracking: action.bool };
    }
    case AUTH_USER:
      return action.user;
    case LOGOUT_USER:
      return authUser;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
};

let middleware;

if (process.env.NODE_ENV !== 'development') {
  middleware = applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  );
} else {
  middleware = applyMiddleware(thunkMiddleware);
}

export default createStore(reducer, middleware);
