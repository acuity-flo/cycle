import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProfileUpdate from '../forms/ProfileUpdate';
import PasswordUpdate from '../forms/PasswordUpdate';
import UserDataView from './UserDataView';
import UserSwitch from '../forms/UserSwitches';
import {
  Dialog,
  DialogContent,
  Container,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';

const UserProfile = (props) => {
  const user = props.user;
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
    <Container>
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

      <Dialog
        open={openPW}
        onClose={handleClosePW}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={classes.dialogBox}
      >
        <DialogContent className={classes.paper}>
          <PasswordUpdate user={user} />

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
  inputItem: {
    margin: '0.5em',
    width: '20vw',
  },
}));

const mapState = (state) => {
  return {
    user: state.authUser,
    isLoggedIn: !!state.authUser._id,
  };
};

export default connect(mapState)(UserProfile);
