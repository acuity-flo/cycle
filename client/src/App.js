import React, { Fragment, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import { Route, Switch, BrowserRouter as Router} from 'react-router-dom'

//Thunks
import { authMe } from './store'

//Component Imports
import CalendarView from './components/Calendar'
import Homepage from './components/Homepage'
import UserProfile from './components/UserProfile'
import ChartHome from './components/ChartHome'
import NavBar from './components/NavBar'

//DataVis Imports
import PeriodChart from "./dataVis/PeriodChart"




function App(props) {
  const user = props.authUser
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(authMe())
  }, [])

  console.log(user)
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path = "/me" component={UserProfile}/>
        <Route exact path = "/calendar" component={CalendarView}/>
        <Route exact path = "/charts" component={ChartHome}/>
      </Switch>
    </Router>
    // <Fragment>
    //   <button onClick={() => dispatch(logout())}>Logout</button>
    //   {/* {user._id && <PeriodChart user={user} />} */}
    //   {user._id && <CalendarView />}
    //   <Auth />
    // </Fragment>

  )
}

const mapState = state => {
  return {
    authUser: state,
    isLoggedIn: !!state.id
  }
}

export default connect(mapState)(App);
