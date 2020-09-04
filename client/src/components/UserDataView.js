import React from 'react';
import moment from 'moment';
import { UTIL_FINANCE, UTIL_FINANCE_TOTALS } from '../utilFcn';

// add condition to util function for totals so doesn't calculate for empty array
// fix default month view
// make sure to grab year rather than default to 2020 -- add year selection to user profile view

const UserDataView = (props) => {
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

  const financeObj = UTIL_FINANCE(financial, start, end);
  const financialTotalsObj = UTIL_FINANCE_TOTALS(financeObj);

  return (
    <div>
      <h4>your financial data for {month.format('MMMM YYYY')}</h4>
      <div>doctor expenses: {financialTotalsObj.doctor}</div>
      <div>prescription expenses: {financialTotalsObj.prescription}</div>
      <div>
        sanitary products expenses: {financialTotalsObj.sanitaryProduct}
      </div>
      <div>costs total: {financialTotalsObj.total}</div>
    </div>
  );
};

export default UserDataView;
