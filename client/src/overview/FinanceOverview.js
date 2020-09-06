import React, { Fragment } from 'react';
import {
  UTIL_FINANCE,
  UTIL_FINANCE_TOTALS,
  UTIL_FINANCE_MONTH,
} from '../utilFcn';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';

const FinanceOverview = (props) => {
  const { start, end, financial } = props;
  const financeObj = UTIL_FINANCE(financial, start, end);
  const financialTotalsObj = UTIL_FINANCE_TOTALS(financeObj);
  const sortedMonth = UTIL_FINANCE_MONTH(financial, start, end);

  return (
    <Fragment>
      {financialTotalsObj.total ? (
        <div>
          <Typography variant="body2" gutterBottom style={{ color: '#9BB47A' }}>
            COSTS
          </Typography>
          <Typography variant="body2" gutterBottom>
            <div>doctor: ${financialTotalsObj.doctor}</div>
            <div>prescription: ${financialTotalsObj.prescription}</div>
            <div>sanitary products: ${financialTotalsObj.sanitaryProduct}</div>
            <div>total: ${financialTotalsObj.total}</div>
          </Typography>
        </div>
      ) : (
        <Typography variant="body2" gutterBottom>
          no costs this month
        </Typography>
      )}
    </Fragment>
  );
};

export default FinanceOverview;
