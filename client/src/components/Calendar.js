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
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const circlesFunc = ({ date, view }) => {
    return (
      <div>
<<<<<<< HEAD
        {period &&
        view === 'month' &&
        period.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon style={{ fill: '#d8bfd8' }} fontSize="small" />
        ) : (
          ''
        )}
        {finance &&
        view === 'month' &&
        finance.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon style={{ fill: '#E7C39C' }} fontSize="small" />
        ) : (
          ''
        )}
        {symptoms &&
        view === 'month' &&
        symptoms.some(
          (el) =>
            moment(el.date).format('MM DD YYYY') ===
            moment(date).format('MM DD YYYY')
        ) ? (
          <FiberManualRecordIcon style={{ fill: '#9cc0e7' }} fontSize="small" />
        ) : (
          ''
        )}
=======
        {(period &&
            view === 'month' &&
            period.some(
              (el) =>
                moment(el.date).format('MM DD YYYY') ===
                moment(date).format('MM DD YYYY')
            )
          ) ? <FiberManualRecordIcon style={{fill: '#DEB88F' }} fontSize="small"/> : ""
        }


        {(
          finance &&
          view === 'month' &&
          finance.some(
            (el) =>
              moment(el.date).format('MM DD YYYY') ===
              moment(date).format('MM DD YYYY')
          )
        ) ? <FiberManualRecordIcon style={{fill: '#9BB47A' }} fontSize="small"/> : ""
        }

        {(
          symptoms &&
          view === 'month' &&
          symptoms.some(
            (el) =>
              moment(el.date).format('MM DD YYYY') ===
              moment(date).format('MM DD YYYY')
          )
        ) ? <FiberManualRecordIcon style={{fill: '#8FB5DE' }} fontSize="small"/> : ""
        }

>>>>>>> 7ebbe4838c3aa3c62c555d1728f426160f982c3f
      </div>
    );
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
          tileContent={circlesFunc}
        ></Calendar>
      </Container>
      <br />
      <p>
        Key:
<<<<<<< HEAD
        <p>
          Period:{' '}
          <FiberManualRecordIcon style={{ fill: '#d8bfd8' }} fontSize="small" />{' '}
        </p>
        <p>
          Finance:{' '}
          <FiberManualRecordIcon style={{ fill: '#E7C39C' }} fontSize="small" />
        </p>
        <p>
          Symptom:{' '}
          <FiberManualRecordIcon style={{ fill: '#9cc0e7' }} fontSize="small" />
        </p>
=======
          <p>Period: <FiberManualRecordIcon style={{fill: '#DEB88F' }} fontSize="small"/> </p>
          <p>Finance:  <FiberManualRecordIcon style={{fill: '#9BB47A' }} fontSize="small"/></p>
          <p>Symptom:  <FiberManualRecordIcon style={{fill: '#8FB5DE' }} fontSize="small"/></p>

>>>>>>> 7ebbe4838c3aa3c62c555d1728f426160f982c3f
      </p>
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
}));

const mapState = (state) => {
  return {
    authUser: state.authUser,
    isLoggedIn: !!state.authUser._id,
  };
};

export default connect(mapState)(CalendarView);
