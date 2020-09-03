import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

//Thunks
import { authMe } from './store';

//Component Imports
import HomePage from './components/HomePage';
import CalendarView from './components/Calendar';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import ChartHome from './components/ChartHome';
import NavBar from './components/NavBar';
import ErrorComp from './components/404';

function App(props) {
  const [loading, setLoading] = useState(true);
  const user = props.authUser;
  const isLoggedIn = props.isLoggedIn;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authMe());
    setLoading(false);
  }, [dispatch]);

  //Need to figure out Auth form loads before route path
  if (!loading) {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route exact path="/login" component={LoginPage} /> */}
          {isLoggedIn && (
            <Switch>
              <Route exact path="/me" component={UserProfile} />
              <Route exact path="/calendar" component={CalendarView} />
              <Route exact path="/charts" component={ChartHome} />
              <Route component={ErrorComp} />
            </Switch>
          )}
          {/* Default component */}
          {!isLoggedIn && <Route component={LoginPage} />}
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <NavBar />
        <h1>LOADIN</h1>
      </Router>
    );
  }
}

const mapState = (state) => {
  return {
    authUser: state,
    isLoggedIn: !!state._id,
  };
};

export default connect(mapState)(App);
