import React from 'react';
import { UTIL_FINANCE, UTIL_FINANCE_TOTALS } from '../utilFcn';
import { Container, Typography } from '@material-ui/core';

const FinanceOverview = (props) => {
  const { start, end, financial } = props;
  const financeObj = UTIL_FINANCE(financial, start, end);
  const financialTotalsObj = UTIL_FINANCE_TOTALS(financeObj);

  return (
    <Container>
      <Typography>
        {financialTotalsObj.total ? (
          <div>
            <div>doctor expenses: ${financialTotalsObj.doctor}</div>
            <div>prescription expenses: ${financialTotalsObj.prescription}</div>
            <div>
              sanitary products expenses: ${financialTotalsObj.sanitaryProduct}
            </div>
            <div>costs total: ${financialTotalsObj.total}</div>{' '}
          </div>
        ) : (
          <p>no costs this month</p>
        )}
      </Typography>
    </Container>
  );
};

export default FinanceOverview;
