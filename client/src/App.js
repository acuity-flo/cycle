import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ReactLoading from 'react-loading'

//Thunks
import { authMe } from './store';

//Component Imports
import Home from './components/Home';
import CalendarView from './components/Calendar';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import ChartHome from './components/ChartHome';
import NavBar from './components/NavBar';
import ErrorComp from './components/404';



function App(props) {
  const [loading, setLoading] = useState(true);
  const user = props.user;
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
          <Route exact path="/" component={Home} />
  
          {isLoggedIn && (
            <Switch>
              <Route exact path="/calendar" component={CalendarView} />
              <Route exact path="/charts" component={ChartHome} />
              <Route exact path="/profile" component={UserProfile} />
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
        <ReactLoading type={'balls'} color={'#545454'} height={'20%'} width={'20%'} />
      </Router>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.authUser,
    isLoggedIn: !!state.authUser._id,
  };
};

export default connect(mapState)(App);
