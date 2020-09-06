import React from 'react';
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
    <Container>
      <Typography>
        {financialTotalsObj.total ? (
          <div>
            <div>your total costs</div>
            <ul>
              <div>doctor: ${financialTotalsObj.doctor}</div>
              <div>prescription: ${financialTotalsObj.prescription}</div>
              <div>
                sanitary products: ${financialTotalsObj.sanitaryProduct}
              </div>
              <div>total: ${financialTotalsObj.total}</div>
            </ul>
          </div>
        ) : (
          <p>no costs this month</p>
        )}
      </Typography>
      <Typography></Typography>
    </Container>
  );
};

export default FinanceOverview;
