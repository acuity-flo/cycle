import React, { useState, Fragment } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormContainer from '../forms/FormContainer';

function CalendarView(props) {
  const [value, onChange] = useState(new Date());
  const [scroll, setScroll] = React.useState('paper');
  const user = props.authUser;
  const message = props.message;
  const period = user.period;
  const finance = user.financial;
  const symptoms = user.symptomTags;
  const periodTracking = user.periodTracking;
  const symptomTracking = user.symptomTracking;
  const financeTracking = user.financialTracking;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  //render dots on the calendar func
  const circlesFunc = ({ date, view }) => {
    return (
      <div className={classes.dots}>
        {periodTracking &&
        period &&
        view === 'month' &&
        period.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon
            style={{ fill: '#DEB88F' }}
            fontSize="inherit"
          />
        ) : (
          ''
        )}

        {financeTracking &&
        finance &&
        view === 'month' &&
        finance.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon
            style={{ fill: '#9BB47A' }}
            fontSize="inherit"
          />
        ) : (
          ''
        )}

        {symptomTracking &&
        symptoms &&
        view === 'month' &&
        symptoms.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon
            style={{ fill: '#8FB5DE' }}
            fontSize="inherit"
          />
        ) : (
          ''
        )}
      </div>
    );
  };

  //renders key func
  const keyRender = () => {
    return (
      <div className={classes.key}>
        {periodTracking ? (
          <div className={classes.keyItem}>
            <FiberManualRecordIcon
              style={{ fill: '#DEB88F' }}
              fontSize="inherit"
            />
            <Typography>Period</Typography>
          </div>
        ) : (
          ''
        )}
        {financeTracking ? (
          <div className={classes.keyItem}>
            <FiberManualRecordIcon
              style={{ fill: '#9BB47A' }}
              fontSize="inherit"
            />
            <Typography>Finance</Typography>
          </div>
        ) : (
          ''
        )}
        {symptomTracking ? (
          <div className={classes.keyItem}>
            <FiberManualRecordIcon
              style={{ fill: '#8FB5DE' }}
              fontSize="inherit"
            />
            <Typography>Symptom</Typography>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <Container className={classes.container}>
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={(value) => {
            setDate(value);
            setOpen(true);
          }}
          tileContent={circlesFunc}
          alt={'Calendar'}
          className={classes.calendar}
          tileClassName={classes.tiles}
        />
        {keyRender()}
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {moment(date).format('MMMM D, YYYY')}
        </DialogTitle>
        <DialogContent className={classes.paper}>
          <DialogContentText>
            <FormContainer date={date} user={user} message={message} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: '2em',
    alignItems: 'center',
    width: '40%',
    '@media(max-width: 1000px)': {
      width: '55%',
    },
    '@media(max-width: 800px)': {
      width: '65%',
    },
    '@media(max-width: 600px)': {
      width: '80%',
    },
    '@media(max-width: 400px)': {
      width: '95%',
    },
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '@media(max-width: 400px)': {
      padding: theme.spacing(2, 1, 2),
    },
    overflowX: 'hidden',
  },
  tiles: {
    color: 'black',
    fontSize: '0.8em',
  },
  calendar: {
    border: 'none',
    fontFamily: 'Roboto',
  },
  key: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'space-between',
  },
  keyItem: {
    display: 'flex',
  },
}));

const mapState = (state) => {
  return {
    authUser: state.authUser,
    isLoggedIn: !!state.authUser._id,
    message: state.statusMessage,
  };
};

export default connect(mapState)(CalendarView);
