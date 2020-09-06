import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProfileUpdate from '../forms/ProfileUpdate';
import PasswordUpdate from '../forms/PasswordUpdate';
import UserDataView from './UserDataView';
import UserSwitch from '../forms/UserSwitches';
import {
  Dialog,
  DialogContent,
  Grid,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';

const UserProfile = (props) => {
  const { user, message } = props;
  const [open, setOpen] = useState(false);
  const [openPW, setOpenPW] = useState(false);
  // const [month, setMonth] = useState('default month');
  const [scroll, setScroll] = React.useState('paper');
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClosePW = () => {
    setOpenPW(false);
  };

  return (
    <Grid container alignItems="center" direction="column" className={classes.root}>
      <Typography variant="h4">Hello, {user.name}</Typography>
      <br />
      <Typography variant="h6">Currently Tracking</Typography>
      <Grid container direction="row" justify="center">
        <UserSwitch user={user} />
      </Grid>
      <br />
      <Typography variant="h6">Profile Information</Typography>
      <Typography variant="body2">Email: {user.email}</Typography>
      <Typography variant="body2">Username: {user.username}</Typography>
      <Typography variant="body2">Pronouns: {user.pronouns}</Typography>
      <Typography variant="body2">Average Cycle Length: {user.avgLengthOfCycle} days</Typography>
      <Grid container direction="row" justify="center" className={classes.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => {
            setOpen(true);
          }}
        >
          update profile info
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => {
            setOpenPW(true);
          }}
        >
          update password
        </Button>
      </Grid>
      {/* dialog for update profile info */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={classes.dialogBox}
      >
        <DialogContent className={classes.paper}>
          <ProfileUpdate user={user} message={message} />

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              setOpen(false);
            }}
          >
            close
          </Button>
        </DialogContent>
      </Dialog>
      {/* dialog for update password */}
      <Dialog
        open={openPW}
        onClose={handleClosePW}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={classes.dialogBox}
      >
        <DialogContent className={classes.paper}>
          <PasswordUpdate user={user} message={message} />

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              setOpenPW(false);
            }}
          >
            close
          </Button>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '2em'
  },
  dialogBox: {
    padding: '2em',
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonContainer: {
    margin: '0.5em'
  },
  button: {
    margin: '0.5em',
    backgroundColor: 'white',
    color: '#545454',
    flexShrink: 1
  },
}));

const mapState = (state) => {
  return {
    user: state.authUser,
    isLoggedIn: !!state.authUser._id,
    message: state.statusMessage
  };
};

export default connect(mapState)(UserProfile);
