import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updateProfileThunk } from '../store';

const PasswordUpdate = (props) => {
  const user = props.user;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const update = {};
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.root}>
        <FormControl name="password" className={classes.inputItem}>
          <InputLabel htmlFor="password">password</InputLabel>
          <Input id="password" />
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justify: 'center',
    paddingBottom: '5em',
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '40vw',
    alignItems: 'center',
  },
  inputItem: {
    margin: '0.5em',
    width: '20vw',
  },
  inputLabel: {
    width: '20vw',
  },
  button: {
    margin: '0.5em',
    backgroundColor: 'white',
    color: '#545454',
  },
}));

export default PasswordUpdate;
