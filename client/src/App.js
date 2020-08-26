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
import Auth from "./forms/Auth"

//DataVis Imports
import PeriodChart from "./dataVis/PeriodChart"
import financeUpdate from "./forms/FinanceUpdate"



function App(props) {
  const user = props.authUser
  const isLoggedIn = props.isLoggedIn
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(authMe())
  }, [])

  console.log(user)

  //Need to figure out Auth form loads before route path
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />

        {isLoggedIn && (
          <Switch> 
            <Route exact path = "/me" component={UserProfile}/>
            <Route exact path = "/calendar" component={CalendarView}/>
            <Route exact path = "/charts" component={ChartHome}/>
            <Route path = '/' component={financeUpdate} />  
          </Switch>
        )}


        {/* Default component */}
        <Route component={Auth} />
      </Switch>
    </Router>

  )
}

const mapState = state => {
  return {
    authUser: state,
    isLoggedIn: !!state._id
  }
}

export default connect(mapState)(App);
