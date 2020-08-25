import React, { Fragment, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import BubbleChart from "./components/BubbleChart"
import { useDispatch, connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'


import Homepage from './components/Homepage'
import { Auth } from './components/Auth'
import { authMe, logout } from './store'

import CalendarView from "./components/Calendar"

function App(props) {
  const user = props.authUser
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(authMe())
  }, [])

  console.log(user)
  return (
    // <Switch>
    //   <Route exact path="/" component={Homepage} />

    // </Switch>
    <Fragment>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {/* {user._id && <BubbleChart user={user} />} */}
      {user._id && <CalendarView />}
      <Auth />
    </Fragment>

  )
}

const mapState = state => {
  return {
    authUser: state,
    isLoggedIn: !!state.id
  }
}

export default connect(mapState)(App);
