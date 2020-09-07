import React, { Fragment } from 'react';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import { UTIL_PERIOD_MONTH } from '../utilFcn';

const PeriodOverview = (props) => {
  const { start, end, period } = props;
  const sortedMonth = UTIL_PERIOD_MONTH(period, start, end);

  return (
    <Fragment>
      {!!sortedMonth.length ? (
        <Fragment>
          <Typography variant="body2" style={{ color: '#DEB88F' }} gutterBottom>
            FLOW
          </Typography>
          {sortedMonth.map((el) => {
            return (
              <Typography variant="body2" gutterBottom>
                {moment(el.date).format('MMM Do')}: {el.typeOfFlow}
              </Typography>
            );
          })}
        </Fragment>
      ) : (
        <Typography variant="body2" gutterBottom>
          no flow this month
        </Typography>
      )}
    </Fragment>
  );
};

export default PeriodOverview;
