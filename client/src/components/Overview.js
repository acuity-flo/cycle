import React, { useState } from 'react';
import { connect } from 'react-redux';
import UserDataView from './UserDataView';
import moment from 'moment';
import {
  Container,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const Overview = (props) => {
  const now = moment().format('MMM');
  const user = props.user;
  const [month, setMonth] = useState(now);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <form>
        <FormControl name="months" className={classes.inputItem}>
          <InputLabel id="months">choose month</InputLabel>
          <Select
            labelId="months"
            name="months"
            onChange={(evt) => {
              setMonth(evt.target.value);
            }}
          >
            <MenuItem value="january">january</MenuItem>
            <MenuItem value="february">february</MenuItem>
            <MenuItem value="march">march</MenuItem>
            <MenuItem value="april">april</MenuItem>
            <MenuItem value="may">may</MenuItem>
            <MenuItem value="june">june</MenuItem>
            <MenuItem value="july">july</MenuItem>
            <MenuItem value="august">august</MenuItem>
            <MenuItem value="september">september</MenuItem>
            <MenuItem value="october">october</MenuItem>
            <MenuItem value="november">november</MenuItem>
            <MenuItem value="december">december</MenuItem>
          </Select>
        </FormControl>
      </form>
      <br />
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
export default connect(mapState)(Overview);
