import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProfileUpdate from '../forms/ProfileUpdate';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Container,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserSwitch from '../forms/UserSwitches';

const UserProfile = (props) => {
  const user = props.user;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [scroll, setScroll] = React.useState('paper');
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <h1>PROFILE</h1>
      <h5>Welcome, {user.name}</h5>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Pronouns: {user.pronouns}</p>
      <p>Average Cycle Length: {user.avgLengthOfCycle}</p>
      <UserSwitch user={user} />
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
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={classes.dialogBox}
      >
        <DialogTitle id="scroll-dialog-title">Update Profile Info</DialogTitle>
        <DialogContent className={classes.paper}>
          <ProfileUpdate user={user} />
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
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    padding: '2em',
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: '0.5em',
    backgroundColor: 'white',
    color: '#545454',
  },
}));

const mapState = (state) => {
  return {
    user: state.authUser,
    isLoggedIn: !!state.authUser._id,
  };
};

export default connect(mapState)(UserProfile);
