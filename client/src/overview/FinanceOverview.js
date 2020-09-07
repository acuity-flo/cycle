import React, { Fragment } from 'react';
import {
  UTIL_FINANCE,
  UTIL_FINANCE_TOTALS,
  UTIL_FINANCE_MONTH,
} from '../utilFcn';
import { Typography } from '@material-ui/core';

const FinanceOverview = (props) => {
  const { start, end, financial } = props;
  const financeObj = UTIL_FINANCE(financial, start, end);
  const financialTotalsObj = UTIL_FINANCE_TOTALS(financeObj);
  const sortedMonth = UTIL_FINANCE_MONTH(financial, start, end);

  return (
    <Fragment>
      {financialTotalsObj.total ? (
        <Fragment>
          <Typography variant="body2" gutterBottom style={{ color: '#9BB47A' }}>
            COSTS
          </Typography>
          <Typography variant="body2" gutterBottom>
            doctor: ${financialTotalsObj.doctor}
          </Typography>
          <Typography variant="body2" gutterBottom>
            prescription: ${financialTotalsObj.prescription}
          </Typography>
          <Typography variant="body2" gutterBottom>
            sanitary products: ${financialTotalsObj.sanitaryProduct}
          </Typography>
          <Typography variant="body2" gutterBottom>
            total: ${financialTotalsObj.total}
          </Typography>
        </Fragment>
      ) : (
        <Typography variant="body2" gutterBottom>
          no costs this month
        </Typography>
      )}
    </Fragment>
  );
};

export default FinanceOverview;
