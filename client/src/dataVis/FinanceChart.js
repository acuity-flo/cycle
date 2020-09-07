import React from 'react';

// component and styles
import BillboardChart from 'react-billboardjs';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { UTIL_FINANCE, UTIL_COST } from '../utilFcn';
import { Typography } from '@material-ui/core';

function FinanceChartBB(props) {
  let { start, end, user } = props;
  const financeData = user.financial;

  let financeObj = UTIL_FINANCE(financeData, start, end);
  const financeDoctorArr = financeObj.doctor.map((el) => {
    return UTIL_COST(el);
  });
  const financePrescriptionArr = financeObj.prescription.map((el) => {
    return UTIL_COST(el);
  });
  const financesanitaryProductArr = financeObj.sanitaryProduct.map((el) => {
    return UTIL_COST(el);
  });
  financeObj.doctor = financeDoctorArr;
  financeObj.prescription = financePrescriptionArr;
  financeObj.sanitaryProduct = financesanitaryProductArr;

  let CHART_DATA = {
    x: 'x',
    json: financeObj,
    type: 'line',
    labels: false,
    xFormat: '%m-%d-%Y',
    colors: {
      prescription: '#DEB88F',
      sanitaryProduct: '#9BB47A',
      doctor: '#8FB5DE',
      other: '#A17AB4',
    },
  };

  let CHART_AXIS = {
    x: {
      padding: {
        left: 1000 * 60 * 60 * 6,
        right: 1000 * 60 * 60 * 6,
      },
      type: 'timeseries',
      tick: {
        fit: true,
      },
    },
  };

  let CHART_TOOLTIP = {
    format: {
      title: function (x) {
        return d3.timeFormat('%m-%d-%Y')(x);
      },
    },
  };

  return CHART_DATA && CHART_AXIS && CHART_TOOLTIP ? (
    <div align="center">
      <Typography variant="h6">Finances</Typography>
      <BillboardChart
        data={CHART_DATA}
        axis={CHART_AXIS}
        tooltip={CHART_TOOLTIP}
      />
    </div>
  ) : (
    <></>
  );
}

const mapState = (state) => {
  return {
    user: state.authUser
  };
};

export default connect(mapState)(FinanceChartBB);
