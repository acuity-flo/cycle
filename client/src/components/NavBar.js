import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router';
//material UI imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

//thunk
import { logout } from '../store';
import { ReactComponent as LogoSVG } from '../images/Logo2.svg';

function Navbar(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = props.isLoggedIn;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (name) => {
    props.history.push(`/${name}`);
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    props.history.push('/');
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.nav}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              props.history.push('/');
            }}
          >
            <Typography variant="title">
              <LogoSVG height={50} width={50} />
            </Typography>
          </IconButton>

          {auth && (
            <div className={classes.menuButton}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleRedirect('calendar')}>
                  Calendar
                </MenuItem>
                <MenuItem onClick={() => handleRedirect('overview')}>
                  Overview
                </MenuItem>
                <MenuItem onClick={() => handleRedirect('charts')}>
                  My Charts
                </MenuItem>
                <MenuItem onClick={() => handleRedirect('profile')}>
                  Profile
                </MenuItem>

                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapState = (state) => ({
  authUser: state.authUser,
  isLoggedIn: !!state.authUser._id,
});

export default withRouter(connect(mapState)(Navbar));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    background: '#545454',
  },
  menuButton: {
    marginRight: -25,
    marginLeft: 'auto',
    alignContent: 'center',
    fontSize: '100%',
  },
  title: {
    flexGrow: 1,
  },
}));
