import React, { useState } from 'react';
import { connect } from 'react-redux';
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

const ProfileUpdate = (props) => {
  const user = props.authUser;
  const [pronouns, setPronouns] = useState(user.username);
  const [avgLengthOfCycle, setAvgLength] = useState(user.avgLengthOfCycle);
  const classes = useStyles();

  // if don't submit a change, get an empty string
  const handleSubmit = async (event) => {
    event.preventDefault();
    const profileUpdate = {
      name: user.name,
      username: user.username,
      pronouns: user.pronouns,
      avgLengthOfCycle: user.avgLengthOfCycle,
    };
    if (event.target.username.value) {
      profileUpdate.username = event.target.username.value;
    }
    if (event.target.fullName.value) {
      profileUpdate.name = event.target.fullName.value;
    }
    if (event.target.cyclelength.value) {
      profileUpdate.avgLengthOfCycle = Number(event.target.cyclelength.value);
    }
    if (event.target.pronouns.value) {
      profileUpdate.pronouns = event.target.pronouns.value;
    }
    console.log(profileUpdate);
    // now dispatch to redux thunk and send back updateProfile obj
  };

  const handlePronounChange = (event) => {
    setPronouns(event.target.value);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.root}>
        <h4>update profile</h4>
        <FormControl name="username" className={classes.inputItem}>
          <InputLabel htmlFor="username">update username </InputLabel>
          <Input id="username" />
        </FormControl>
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
  pronouns: {
    alignSelf: 'flex-start',
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

const mapState = (state) => {
  return {
    authUser: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(ProfileUpdate);
