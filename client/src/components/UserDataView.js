import React from 'react';
import moment from 'moment';
import FinanceOverview from '../overview/FinanceOverview';
import { Container, Typography } from '@material-ui/core';

const UserDataView = (props) => {
  const user = props.user;
  const periodBool = user.periodTracking;
  const symptomBool = user.symptomTracking;
  const financeBool = user.financialTracking;
  const { financial, period, symptomTags } = props.user;
  const monthStr = props.month;

  const month = moment().month(monthStr);
  const monthYrStr = month.format('YYYY-MM');
  const firstDay = moment(monthYrStr + '-01').format('YYYY-MM');
  const start = moment(firstDay + '-01')
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const firstDayNext = moment(firstDay).add(1, 'M').format('YYYY-MM');
  const end = moment(firstDayNext + '-01').format('YYYY-MM-DD');

  return (
    <Container>
      <Typography>
        <h5>your monthly overview for {month.format('MMMM YYYY')}</h5>
        {financeBool ? (
          <FinanceOverview start={start} end={end} financial={financial} />
        ) : (
          ''
        )}
      </Typography>
    </Container>
  );
};

export default UserDataView;
