import React, { useState } from 'react';
import { connect } from 'react-redux';
import UserDataView from './UserDataView';
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

const Overview = (props) => {
  const user = props.user;
  // const [open, setOpen] = useState(false);
  const [month, setMonth] = useState('default month');
  // const [scroll, setScroll] = React.useState('paper');
  const classes = useStyles();

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Container>
      <h5>your monthly info</h5>

      <form
        onSubmit={() => {
          console.log('clicked submit');
        }}
      >
        <FormControl name="months" className={classes.inputItem}>
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

export default connect(mapState)(Overview);
