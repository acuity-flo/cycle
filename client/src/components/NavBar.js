import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { withRouter } from 'react-router';
//material UI imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';

//thunk
import { logout } from '../store';
import SvgIcon from '@material-ui/icons/Menu';
import LogoSVG from '../images/Logo_Update.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  imgContainer: {
    width: "3%",
    width: "3%",
  },
  img: {
    objectFit: "cover"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  imageIcon: {
    width: '100%',
    heigth: '100%'
  },
}));

const CycleIcon = () => {
  const classes = useStyles()
  return (
    <Icon><img className={classes.imageIcon} src={LogoSVG}/></Icon>
  )
}


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
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <SvgIcon component={CycleIcon} viewBox="0 0 600 476.6"/>
          </IconButton>
          {auth && (
            <div>
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
                <MenuItem onClick={() => handleRedirect('me')}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleRedirect('charts')}>
                  My Charts
                </MenuItem>
                <MenuItem onClick={() => handleRedirect('calendar')}>
                  Calendar
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
  authUser: state,
  isLoggedIn: !!state._id,
});

export default withRouter(connect(mapState)(Navbar));
