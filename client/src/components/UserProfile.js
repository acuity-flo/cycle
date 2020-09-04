import React, { useState } from 'react';
import { connect } from 'react-redux';
import ProfileUpdate from '../forms/ProfileUpdate';
import UserDataView from './UserDataView';
import UserSwitch from '../forms/UserSwitches';
import moment from 'moment';
import {
  Dialog,
  DialogContent,
  Container,
  Button,
  makeStyles,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';

const UserProfile = (props) => {
  const user = props.user;
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState('default month');
  const [scroll, setScroll] = React.useState('paper');
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
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

      <form
        onSubmit={() => {
          console.log('clicked submit');
        }}
      >
        <FormControl name="pronouns" className={classes.inputItem}>
          <InputLabel id="months">choose month</InputLabel>
          <Select
            labelId="months"
            name="months"
            onChange={(evt) => {
              setMonth(evt.target.value);
            }}
          >
            <MenuItem value="june">june</MenuItem>
            <MenuItem value="july">july</MenuItem>
            <MenuItem value="august">august</MenuItem>
            <MenuItem value="january">january</MenuItem>
            <MenuItem value="february">february</MenuItem>
            <MenuItem value="march">march</MenuItem>
          </Select>
        </FormControl>
      </form>
      <UserDataView user={user} month={month} />
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
