import React from 'react';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import { UTIL_PERIOD_MONTH } from '../utilFcn';

const PeriodOverview = (props) => {
  const { start, end, period } = props;
  const sortedMonth = UTIL_PERIOD_MONTH(period, start, end);

  return (
    <Container>
      <Typography>
        {!!sortedMonth.length ? (
          <div>
            <div>your flow</div>
            <ul>
              {sortedMonth.map((el) => {
                return (
                  <div>
                    {moment(el.date).format('MMM Do')}: {el.typeOfFlow}
                  </div>
                );
              })}
            </ul>
          </div>
        ) : (
          <p>no flow this month</p>
        )}
      </Typography>
    </Container>
  );
};

export default PeriodOverview;
