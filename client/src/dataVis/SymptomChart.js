import React, { Component, useEffect, useState } from 'react';
// import { UTIL_SYMPTOM } from '../utilFcn';

// component and styles
import BillboardChart from 'react-billboardjs';
import * as d3 from 'd3';
import moment from 'moment';
import { connect } from 'react-redux';

const UTIL_SYMPTOMS_LIST = {
  mood: ['stressed', 'calm', 'motivated', 'unmotivated'],
  emotion: ['happy', 'sad', 'angry', 'frustrated', 'anxious'],
  pain: ['cramps', 'headache', 'back pain'],
  physical: ['nausea', 'bloating', 'indigestion', 'snacky', 'pms'],
};
// MOOD = 10, 11, 12, 13, 14, 15 -- 1
// EMOTION = 20, 21, 22, 23, 24 -- 2

const UTIL_SYMPTOM = (symptomData, start, end) => {

  const symptomObj = symptomData.reduce(
    (acc, el) => {

      if (moment(el.date).isBetween(start, end)) {
        const dateChange = el.date.slice(0,10)
        el.symptoms.forEach((innerEl) => {

          if (innerEl.category === 'mood') {
            acc.mood.push(innerEl.symptomName);
            acc.mood_x.push(moment(dateChange).format('MM-DD-YYYY'));
            }
          if (innerEl.category === 'emotion') {
            acc.emotion.push(innerEl.symptomName);
            acc.emotion_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'pain') {
            acc.pain.push(innerEl.symptomName);
            acc.pain_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'physical') {
            acc.physical.push(innerEl.symptomName);
            acc.physical_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
          if (innerEl.category === 'custom') {
            acc.custom.push(innerEl.symptomName);
            acc.custom_x.push(moment(dateChange).format('MM-DD-YYYY'));
          }
        });
      }
      return acc;
    },
    {
      mood: ['mood'],
      mood_x: ['mood_x'],
      emotion: ['emotion'],
      emotion_x: ['emotion_x'],
      pain: ['pain'],
      pain_x: ['pain_x'],
      physical: ['physical'],
      physical_x: ['physical_x'],
      custom: ['custom'],
      custom_x: ['custom_x'],
    }
  );

  let columns = [
    symptomObj['mood_x'],
    symptomObj['emotion_x'],
    symptomObj['pain_x'],
    symptomObj['physical_x'],
    symptomObj['custom_x'],
    symptomObj['mood'].map((el, idx) => {
      if (idx > 0) {
        const value = 10 + UTIL_SYMPTOMS_LIST['mood'].indexOf(el);
        return Number(value);
      } else {
        return el;
      }
    }),
    symptomObj['emotion'].map((el, idx) => {
      if (idx > 0) {
        const value = 20 + UTIL_SYMPTOMS_LIST['emotion'].indexOf(el);
        return Number(value);
      } else {
        return el;
      }
    }),
    symptomObj['pain'].map((el, idx) => {
      if (idx > 0) {
        const value = 30 + UTIL_SYMPTOMS_LIST['pain'].indexOf(el);
        return Number(value);
      } else {
        return el;
      }
    }),
    symptomObj['physical'].map((el, idx) => {
      if (idx > 0) {
        const value = 40 + UTIL_SYMPTOMS_LIST['physical'].indexOf(el);
        return Number(value);
      } else {
        return el;
      }
    }),
    symptomObj['custom'].map((el, idx) => {
      if (idx > 0) {
        const value = 50 + UTIL_SYMPTOMS_LIST['custom'].indexOf(el);
        return Number(value);
      } else {
        return el;
      }
    }),
  ];
  //return columns;

  let labels = [
    symptomObj['mood'],
    symptomObj['emotion'],
    symptomObj['pain'],
    symptomObj['physical'],
    symptomObj['custom'],
  ];

  let data = {
    columns,
    labels,
  };

  return data;
};

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
        if (10 <= y && y<20){return UTIL_SYMPTOMS_LIST["mood"][y-10]}
        if (20 <= y && y<30){return UTIL_SYMPTOMS_LIST["emotion"][y-20]}
        if (30 <= y && y<40){return UTIL_SYMPTOMS_LIST["pain"][y-30]}
        if (40 <= y && y<50){return UTIL_SYMPTOMS_LIST["physical"][y-40]}
      }
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
    y:{
      tick: {
        show: false, 
        text:{
          show: false
        }
      }
    }


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
