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
import Typography from '@material-ui/core/Typography'

//thunk
import { logout } from '../store';
import SvgIcon from '@material-ui/icons/Menu';
import { ReactComponent as LogoSVG }  from '../images/Logo2.svg'
import LogoPNG from '../images/Logo.png'



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
      <AppBar position="sticky" className = {classes.nav}>
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick = {()=> {
              props.history.push('/')
            }}
          >
          <Typography variant="title">
            <LogoSVG height={50} width={50}/>
          </Typography>
          {/* <button><SvgIcon component={CycleIcon} viewBox="0 0 24 24"/></button> */}
            {/* <SvgIcon component={CycleIcon} viewBox="0 0 24 24"/> */}
            {/* <Icon classes={{root: classes.iconRoot}} >  */}
              {/* <img src= {LogoPNG} className = {classes.imageIcon} />  */}
              {/* <h1></h1> */}
            {/* </Icon> */}
            {/* <img src = "Logo.png"/> */}
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


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    background: '#545454'
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
    fontSize: '500%'
  },
  title: {
    flexGrow: 1,
  },
  imageIcon: {
    //  width: '100%',
    height: '100%', 
    fontSize: '100vw',
    // textAlign: 'initial',
    // marginTop: "5vh",
    // width: "50vw",
    // alignSelf: "center"
  },
  iconHome: {
    // fontSize: '50px',
    // paddingBottom: "2px", 
    justifyContent: "center",
    // marginTop: "5vh",
    // width: "50vw",
    // alignSelf: "center"
  },
  iconRoot: {
    alignSelf: "center"
  }
}));

// const CycleIcon = () => {
//   const classes = useStyles()
//   return (
//     <Icon className={classes.iconHome}><img src={LogoSVG} className={classes.imageIcon}/></Icon>
//     // className={classes.imageIcon}
//     //height ={25} width={25}
//   )
// }


