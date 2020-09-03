import React from 'react';

// component and styles
import BillboardChart from 'react-billboardjs';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { UTIL_SYMPTOM, UTIL_SYMPTOMS_LABEL } from '../utilFcn';

function SymptomChartBB(props) {
  let { start, end, user } = props;
  let symptomData = user.symptomTags;

  let symptomCol = UTIL_SYMPTOM(symptomData, start, end);

  let CHART_DATA = {
    xs: {
      mood: symptomCol.columns[0][0],
      emotion: symptomCol.columns[1][0],
      pain: symptomCol.columns[2][0],
      physical: symptomCol.columns[3][0],
      custom: symptomCol.columns[4][0],
    },
    columns: symptomCol.columns,
    type: 'scatter',
    labels: {
      format: (y) => {
        return UTIL_SYMPTOMS_LABEL(y);
      },
    },
    xFormat: '%m-%d-%Y',
  };

  let CHART_AXIS = {
    x: {
      tick: {
        fit: true,
      },
      type: 'timeseries',
    },
    y: {
      tick: {
        show: false,
        text: {
          show: false,
        },
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
    user: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(SymptomChartBB);
