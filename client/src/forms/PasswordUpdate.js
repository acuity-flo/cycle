import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updatePasswordThunk } from '../store';

const PasswordUpdate = (props) => {
  const { user, message } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      updatePasswordThunk(
        user.username,
        event.currentTarget.oldPassword.value,
        event.currentTarget.passwordNewOne.value,
        event.currentTarget.passwordNewTwo.value
      )
    );
  };

  useEffect(() => {
    setStatusMessage(message);
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormControl name="oldPassword" className={classes.inputItem}>
        <InputLabel htmlFor="oldPassword">Current Password</InputLabel>
        <Input type="password" id="oldPassword" />
      </FormControl>
      <FormControl name="passwordNewOne" className={classes.inputItem}>
        <InputLabel htmlFor="passwordNewOne">New Password</InputLabel>
        <Input type="password" id="passwordNewOne" />
      </FormControl>
      <FormControl name="passwordNewTwo" className={classes.inputItem}>
        <InputLabel htmlFor="passwordNewTwo">Confirm New Password</InputLabel>
        <Input type="password" id="passwordNewTwo" />
      </FormControl>
      {statusMessage && (
        <Typography variant="body2">{statusMessage}</Typography>
      )}
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  inputItem: {
    margin: '0.5em',
    minWidth: '240px',
  },
  button: {
    margin: '0.5em',
    backgroundColor: 'white',
    color: '#545454',
  },
}));

export default PasswordUpdate;
