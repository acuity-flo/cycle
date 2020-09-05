import React from 'react';
import moment from 'moment';
import FinanceOverview from '../overview/FinanceOverview';

// add condition to util function for totals so doesn't calculate for empty array
// fix default month view
// make sure to grab year rather than default to 2020 -- add year selection to user profile view

const UserDataView = (props) => {
  const user = props.user;
  const periodBool = user.periodTracking;
  const symptomBool = user.symptomTracking;
  const financeBool = user.financialTracking;
  const { financial, period, symptomTags } = props.user;
  const monthStr = props.month;

  // defaults to today if doesn't recognize the string passed in
  // sets the month correctly and assigned the current day as the day of the month
  const month = moment().month(monthStr);
  const monthYrStr = month.format('YYYY-MM');
  // const MonthYrDisplay = month.format('YYYY-MM');
  const firstDay = moment(monthYrStr + '-01').format('YYYY-MM');
  // start is the first day of the chosen month - 1 day
  const start = moment(firstDay + '-01')
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const firstDayNext = moment(firstDay).add(1, 'M').format('YYYY-MM');
  // end is the first day of the chosen month + 1 month
  const end = moment(firstDayNext + '-01').format('YYYY-MM-DD');

  return (
    <div>
      <h5>your monthly overview for {month.format('MMMM YYYY')}</h5>
      {financeBool ? (
        <FinanceOverview start={start} end={end} financial={financial} />
      ) : (
        ''
      )}
    </div>
  );
};

export default UserDataView;
