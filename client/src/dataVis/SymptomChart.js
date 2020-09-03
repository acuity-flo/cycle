import React from 'react';

// component and styles
import BillboardChart from 'react-billboardjs';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { UTIL_SYMPTOM, UTIL_SYMPTOMS_LIST } from '../utilFcn';

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
        if (10 <= y && y < 20) {
          return UTIL_SYMPTOMS_LIST['mood'][y - 10];
        }
        if (20 <= y && y < 30) {
          return UTIL_SYMPTOMS_LIST['emotion'][y - 20];
        }
        if (30 <= y && y < 40) {
          return UTIL_SYMPTOMS_LIST['pain'][y - 30];
        }
        if (40 <= y && y < 50) {
          return UTIL_SYMPTOMS_LIST['physical'][y - 40];
        }
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
