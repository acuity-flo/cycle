import React, { useState } from 'react';
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
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormContainer from '../forms/FormContainer';

function CalendarView(props) {
  const [value, onChange] = useState(new Date());
  const [scroll, setScroll] = React.useState('paper');
  const user = props.authUser;
  const period = user.period;
  const finance = user.financial;
  const symptoms = user.symptomTags;
  const periodTracking = user.periodTracking
  const symptomTracking = user.symptomTracking
  const financeTracking = user.financialTracking
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  //render dots on the calendar func
  const circlesFunc = ({ date, view }) => {
    return (
      <div>
        {periodTracking && period &&
        view === 'month' &&
        period.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon style={{ fill: '#DEB88F' }} fontSize="small" />
        ) : (
          ''
        )}

        {financeTracking && finance &&
        view === 'month' &&
        finance.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon style={{ fill: '#9BB47A' }} fontSize="small" />
        ) : (
          ''
        )}

        {symptomTracking && symptoms &&
        view === 'month' &&
        symptoms.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon style={{ fill: '#8FB5DE' }} fontSize="small" />
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
        {periodTracking ?
        <div>
        Period:{' '}
        <FiberManualRecordIcon style={{ fill: '#DEB88F' }} fontSize="small" />{' '}
        </div> : " "
        }

        {financeTracking ?
        <div>
        Finance:{' '}
        <FiberManualRecordIcon style={{ fill: '#9BB47A' }} fontSize="small" />
        </div> : " "
        }

        {symptomTracking ?
        <div>
        {' '} Symptom:{' '}
        <FiberManualRecordIcon style={{ fill: '#8FB5DE' }} fontSize="small" />
        </div> : " "
        }

      </div>
    )
  }


  return (
    <div>
      <br/>
      <Container maxWidth="xs">
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={(value) => {
            setDate(value);
            setOpen(true);
          }}
          tileContent={circlesFunc}
          alt={"Calendar"}
        />

        <Typography >
          {keyRender()}
        </Typography>

      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={classes.dialogBox}
      >
        <DialogTitle id="scroll-dialog-title">
          {moment(date).format('MMMM D, YYYY')}
        </DialogTitle>
        <DialogContent className={classes.paper}>
          <DialogContentText>
            <FormContainer date={date} user={user} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
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
  key:{
    display: "flex",
    justifyContent: "space-between"
  }
}));

const mapState = (state) => {
  return {
    authUser: state.authUser,
    isLoggedIn: !!state.authUser._id,
  };
};

export default connect(mapState)(CalendarView);
