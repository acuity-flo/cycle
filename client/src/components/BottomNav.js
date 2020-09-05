import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router';
//material UI imports
import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PersonIcon from '@material-ui/icons/Person';




function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Calendar" value="calendar" icon={<DateRangeIcon />} />
      <BottomNavigationAction label="Charts" value="charts" icon={<AssessmentIcon />} />
      <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon/>} />
    </BottomNavigation>
  )
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




