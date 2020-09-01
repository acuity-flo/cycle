import React, { Component, useEffect, useState } from 'react';
// import { UTIL_SYMPTOM } from '../utilFcn';

// component and styles
import BillboardChart from 'react-billboardjs';
import * as d3 from 'd3';
import moment from 'moment';
import { connect } from 'react-redux';

const UTIL_SYMPTOM = (symptomData, start, end) => {
  const symptomObj = symptomData.reduce(
    (acc, el) => {
      if (moment(el.date).isBetween(start, end)) {
        el.symptoms.filter((innerEl) => {
          if (innerEl.category === 'mood') {
            acc.mood.push(innerEl.symptomName);
            acc.mood_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'emotion') {
            acc.emotion.push(innerEl.symptomName);
            acc.emotion_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'pain') {
            acc.pain.push(innerEl.symptomName);
            acc.pain_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'physical') {
            acc.physical.push(innerEl.symptomName);
            acc.physical_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'custom') {
            acc.custom.push(innerEl.symptomName);
            acc.custom_x.push(moment(el.date).format('MM-DD-YYYY'));
          }
        });
      }
      return acc;
    },
    {
      mood: [],
      mood_x: [],
      emotion: [],
      emotion_x: [],
      pain: [],
      pain_x: [],
      physical: [],
      physical_x: [],
      custom: [],
      custom_x: [],
    }
  );
  return symptomObj;
};

function SymptomChartBB(props) {
  let { start, end, user } = props;
  let symptomData = user.symptomTags;
  // let [CHART_DATA, setChartData] = useState({});
  // let [CHART_AXIS, setChartAxis] = useState({});
  // let [CHART_TOOLTIP, setChartToolTip] = useState({});
  // let [loading, setLoading] = useState(true);

  let symptomObj = UTIL_SYMPTOM(symptomData, start, end);

  let CHART_DATA = {
    xs: {
      // mood: 'mood_x',
      emotion: 'emotion_x',
      // pain: 'pain_x',
      // physical: 'physical_x',
      // custom: 'custom_x',
    },
    columns: [
      ['emotion_x', '06-04-2020', '06-05-2020', '06-06-2020'],
      ['emotion', '1', '2', '3'],
      // ['emotion', 'anxious', 'anxious', 'anxious'],
    ],
    type: 'scatter',
    // labels: false,
    xFormat: '%m-%d-%Y',
  };

  let CHART_AXIS = {
    x: {
      tick: {
        fit: true,
      },
      type: 'timeseries',
    },
  };

  let CHART_TOOLTIP = {
    format: {
      title: function (x) {
        return d3.timeFormat('%m-%d-%Y')(x);
      },
    },
  };

  // useEffect(() => {
  //   let symptomObj = UTIL_SYMPTOM(symptomData, start, end);
  //   console.log(symptomObj);

  //   setChartData = {
  //     xs: {
  //       // mood: 'mood_x',
  //       emotion: 'emotion_x',
  //       // pain: 'pain_x',
  //       // physical: 'physical_x',
  //       // custom: 'custom_x',
  //     },
  //     columns: [
  //       ['emotion_x', '06-04-2020', '06-05-2020', '06-06-2020'],
  //       ['emotion', 'anxious', 'anxious', 'anxious'],
  //     ],
  //     type: 'scatter',
  //     // labels: false,
  //     xFormat: '%m-%d-%Y',
  //   };

  //   setChartAxis = {
  //     x: {
  //       tick: {
  //         fit: true,
  //       },
  //       type: 'timeseries',
  //     },
  //   };

  //   setChartToolTip = {
  //     format: {
  //       title: function (x) {
  //         return d3.timeFormat('%m-%d-%Y')(x);
  //       },
  //     },
  //   };

  //   setLoading(false);
  // }, [user, start, end]);

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
