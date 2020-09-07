import React from 'react';

// component and styles
import BillboardChart from 'react-billboardjs';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { UTIL_PERIOD_FLOW, UTIL_PERIOD_STR } from '../utilFcn';
import { Typography } from '@material-ui/core';

function PeriodChartBB(props) {
  let { start, end, user } = props;
  let CHART_AXIS, CHART_TOOLTIP, CHART_DATA;

  const periodData = user.period;

  const flowObj = UTIL_PERIOD_FLOW(periodData, start, end);

  CHART_DATA = {
    x: 'x',
    json: flowObj,
    type: 'bubble',
    labels: false,
    xFormat: '%m-%d-%Y',
    colors: {
      flow: '#DEB88F',
    },
  };

  CHART_AXIS = {
    x: {
      padding: {
        left: 500,
        right: 200,
      },
      tick: {
        fit: true,
      },
      min: {
        fit: true,
      },
      max: {
        fit: true,
      },
      type: 'timeseries',
      padding: {
        left: 1000 * 60 * 60 * 6,
        right: 1000 * 60 * 60 * 6,
      },
    },
    y: {
      tick: {
        outer: true,
        format: function (y) {
          return UTIL_PERIOD_STR(y);
        },
      },
      padding: {
        top: 75,
        bottom: 75,
      },
    },
  };

  CHART_TOOLTIP = {
    format: {
      title: function (x) {
        return d3.timeFormat('%m-%d-%Y')(x);
      },
    },
  };

  return CHART_DATA && CHART_AXIS && CHART_TOOLTIP ? (
    <div align="center">
      <Typography variant="h6">Menstruation</Typography>
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
    user: state.authUser,
    isLoggedIn: !!state.authUser._id,
  };
};

export default connect(mapState)(PeriodChartBB);
