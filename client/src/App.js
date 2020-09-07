import React, { useEffect, Fragment } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//Thunks
import { authMe } from './store';

//Component Imports
import Loading from './components/Loading';
const Home = React.lazy(() => import('./components/Home'));
const CalendarView = React.lazy(() => import('./components/Calendar'));
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const UserProfile = React.lazy(() => import('./components/UserProfile'));
const ChartHome = React.lazy(() => import('./components/ChartHome'));
const NavBar = React.lazy(() => import('./components/NavBar'));
const ErrorComp = React.lazy(() => import('./components/404'));
const BottomNav = React.lazy(() => import('./components/BottomNav'));
const SimpleMobileTop = React.lazy(() =>
  import('./components/SimpleMobileTop')
);
const Overview = React.lazy(() => import('./components/Overview'));
const Footer = React.lazy(() => import('./components/Footer'));

function App(props) {
  const matches = useMediaQuery(
    '@media only screen and (max-device-width: 480px)and (-webkit-min-device-pixel-ratio: 2)'
  );
  const isLoggedIn = props.isLoggedIn;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authMe());
  }, [dispatch]);

  return (
    <Fragment>
      <React.Suspense fallback={<Loading />}>
        <Router>
          {!matches && <NavBar />}
          {matches && <SimpleMobileTop />}
          <Switch>
            <Route exact path="/" component={Home} />
            {isLoggedIn && (
              <Switch>
                <Route exact path="/calendar" component={CalendarView} />
                <Route exact path="/overview" component={Overview} />
                <Route exact path="/charts" component={ChartHome} />
                <Route exact path="/profile" component={UserProfile} />
                <Route component={ErrorComp} />
              </Switch>
            )}
            {!isLoggedIn && <Route component={LoginPage} />}
          </Switch>
          {matches && <BottomNav />}
          {!matches && <Footer />}
        </Router>
      </React.Suspense>
    </Fragment>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.authUser._id,
  };
};

export default connect(mapState)(App);
