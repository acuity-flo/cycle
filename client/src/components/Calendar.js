import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { connect } from 'react-redux';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserDataView from './UserDataView';
import FormContainer from '../forms/FormContainer';

function CalendarView(props) {
  const [value, onChange] = useState(new Date());
  const [scroll, setScroll] = React.useState('paper');
  const user = props.authUser;
  const period = user.period;
  const finance = user.financial;
  const symptoms = user.symptomTags;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  // const [currentView, setView] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const classesFunc = ({ date, view }) => {
    let classesStr = '';
    //colors string for period, finance, symptoms
    if (
      period &&
      view === 'month' &&
      period.some(
        (el) =>
          moment(el.date).format('MM DD YYYY') ===
          moment(date).format('MM DD YYYY')
      )
    ) {
      classesStr += 'period';
    }

    //   finance - colors days of finance
    if (
      finance &&
      view === 'month' &&
      finance.some(
        (el) =>
          moment(el.date).format('MM DD YYYY') ===
          moment(date).format('MM DD YYYY')
      )
    ) {
      classesStr += ' finance';
    }
    if (
      symptoms &&
      view === 'month' &&
      symptoms.some(
        (el) =>
          moment(el.date).format('MM DD YYYY') ===
          moment(date).format('MM DD YYYY')
      )
    ) {
      classesStr += ' symptoms';
    }
    return classesStr;
  };

  return (
    <div>
      <h1>CALENDAR</h1>
      <Container maxWidth="xs">
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={(value) => {
            setDate(value);
            setOpen(true);
          }}
          // onViewChange={({ value, view }) => {
          //   setView(view);
          // }}
          tileClassName={classesFunc}
        ></Calendar>
      </Container>
      <br />
      <p>
        (note: period/symptom/finance data will be displayed on the calendar in
        diff colors)
      </p>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={classes.dialogBox}
      >
        <DialogTitle id="scroll-dialog-title">Update Information</DialogTitle>
        <DialogContent className={classes.paper}>
          <DialogContentText>
            <div>Date: {moment(date).format('MMMM D, YYYY')}</div>
            <FormContainer date={date} user={user} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <UserDataView user={user} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    padding: '2em',
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const mapState = (state) => {
  return {
    authUser: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(CalendarView);
