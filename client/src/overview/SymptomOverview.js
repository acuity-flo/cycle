import React, { Fragment } from 'react';
import { UTIL_SYMPTOM_MONTH } from '../utilFcn';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';

const SymptomOverview = (props) => {
  const { start, end, symptoms } = props;
  let sortedMonth = UTIL_SYMPTOM_MONTH(symptoms, start, end);
  return (
    <Fragment>
      {!!sortedMonth.length ? (
        <div>
          <Typography variant="body2" style={{ color: '#8FB5DE' }} gutterBottom>
            SYMPTOMS
          </Typography>

          {sortedMonth.map((el) => {
            return (
              <Typography variant="body2" gutterBottom>
                {moment(el.date).format('MMM Do')}: {el.symptoms}
              </Typography>
            );
          })}
        </div>
      ) : (
        <Typography variant="body2" gutterBottom>
          no symptoms this month
        </Typography>
      )}
    </Fragment>
  );
};

export default SymptomOverview;
