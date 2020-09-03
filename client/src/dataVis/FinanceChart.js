import React from 'react';

// component and styles
import BillboardChart from 'react-billboardjs';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { UTIL_FINANCE } from '../utilFcn';

function FinanceChartBB(props) {
  let { start, end, user } = props;
  const financeData = user.financial;

  const financeObj = UTIL_FINANCE(financeData, start, end);

  let CHART_DATA = {
    x: 'x',
    json: financeObj,
    type: 'line',
    labels: false,
    xFormat: '%m-%d-%Y',
  };

  let CHART_AXIS = {
    x: {
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
    <BillboardChart
      data={CHART_DATA}
      axis={CHART_AXIS}
      tooltip={CHART_TOOLTIP}
    />
  ) : (
    <></>
  );
}

const mapState = (state) => {
  return {
    user: state.authUser,
    isLoggedIn: !!state.authUser._id,
  };
};

export default connect(mapState)(FinanceChartBB);
