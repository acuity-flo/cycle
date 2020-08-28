import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
// import DayModal from '../forms/CalendarDayModal';
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//TEST
import PeriodUpdate from '../forms/PeriodUpdate';
import FinanceUpdate from '../forms/FinanceUpdate'

function CalendarView(props) {
  const [value, onChange] = useState(new Date());
  const user = props.authUser;
  const period = user.period;
  const finance = user.financial;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const classesFunc = ({ date, view }) => {
    let classesStr = '';
    //   //period - colors days of periods
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
    if(finance && view==="month" && finance.some(el => moment(el.date).format("MM DD YYYY") ===moment(date).format("MM DD YYYY"))) {
      classesStr+=" finance"
    }
    return classesStr;
  };

  return (
    <div>
      <h1>CALENDAR</h1>
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={(value) => {
          setDate(value);
          setOpen(true);
        }}
        tileClassName={classesFunc}
      ></Calendar>
      <br />
      <p>
        (note: period/symptom/finance data will be displayed on the calendar in
        diff colors)
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <div>Date: {moment(date).format('MM DD YYYY')}</div>
          <p>(if you have data for this day, it will be displayed here)</p>
          <br />
          <PeriodUpdate date={date} user={user} />
          <br />
          <br />
          <p>option to add symptoms</p>
          <FinanceUpdate date={date} user={user} />
        </div>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
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
