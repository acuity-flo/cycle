import React from 'react';
import moment from 'moment';

// pass current calendar view in props

const UserDataView = (props) => {
  const { financial, period, symptomTags } = props.user;
  // console.log('good default month?', moment().format('MM MMMM'));
  const monthStr = props.month;
  // defaults to today if doesn't recognize the string passed in
  // sets the month correctly and assigned the current day as the day of the month
  const month = moment().month(monthStr).format('YYYY-MM');
  // console.log('moment month', month);

  // grab data from financial, period and symptomTags given current month view

  return <div>averages</div>;
};

export default UserDataView;
