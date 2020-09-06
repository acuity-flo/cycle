import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//material UI imports
import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';

function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRedirect = (name) => {
    props.history.push(`/${name}`);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        onClick={() => handleRedirect('')}
      />
      <BottomNavigationAction
        label="Calendar"
        value="calendar"
        icon={<DateRangeIcon />}
        onClick={() => handleRedirect('calendar')}
      />
      <BottomNavigationAction
        label="Charts"
        value="charts"
        icon={<AssessmentIcon />}
        onClick={() => handleRedirect('charts')}
      />
      <BottomNavigationAction
        label="Overview"
        value="Overview"
        icon={<ListIcon />}
        onClick={() => handleRedirect('overview')}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonIcon />}
        onClick={() => handleRedirect('profile')}
      />
    </BottomNavigation>
  );
}

const mapState = (state) => ({
  authUser: state.authUser,
  isLoggedIn: !!state.authUser._id,
});

export default withRouter(connect(mapState)(BottomNav));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}));
