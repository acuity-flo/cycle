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

const ProfileUpdate = (props) => {
  const user = props.user;
  const [pronouns, setPronouns] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const update = {};
    if (event.target.fullName.value) {
      update.name = event.target.fullName.value;
    }
    if (event.target.cyclelength.value) {
      update.avgLengthOfCycle = Number(event.target.cyclelength.value);
    }
    if (event.target.pronouns.value) {
      update.pronouns = pronouns;
    }
    if (Object.keys(update).length !== 0) {
      update.username = user.username;
      dispatch(updateProfileThunk(update));
    }
  };

  const handlePronounChange = (event) => {
    setPronouns(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormControl name="fullName" className={classes.inputItem}>
        <InputLabel htmlFor="fullName">update name</InputLabel>
        <Input id="fullName" />
      </FormControl>
      <FormControl name="pronouns" className={classes.inputItem}>
        <InputLabel id="pronouns">update pronouns</InputLabel>
        <Select
          labelId="pronouns"
          value={pronouns}
          name="pronouns"
          onChange={handlePronounChange}
        >
          <MenuItem value="she/her/hers">she/her/hers</MenuItem>
          <MenuItem value="he/him/his">he/him/his</MenuItem>
          <MenuItem value="they/them/theirs">they/them/theirs</MenuItem>
        </Select>
      </FormControl>
      <FormControl name="cyclelength" className={classes.inputItem}>
        <InputLabel id="cyclelength">update cycle length (days)</InputLabel>
        <Input id="cyclelength" />
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
  pronouns: {
    alignSelf: 'flex-start',
  },
  inputItem: {
    margin: '0.5em',
    minWidth: '240px'
  },
  button: {
    margin: '0.5em',
    backgroundColor: 'white',
    color: '#545454',
  },
}));

export default ProfileUpdate;
