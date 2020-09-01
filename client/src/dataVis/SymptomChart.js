// const mood = ['stressed', 'motivated', 'calm', 'unmotivated']
// const emotion = ['happy', 'sad', 'angry', 'frustrated', 'anxious']
// const pain = ['cramp', 'headache', 'back']
// const physical = ['nausea','bloating', 'indigestion','fatigue','snacky','PMS']

import React, { Component, useEffect } from 'react';
import { UTIL_SYMPTOM } from '../../../utilFcn';

// component and styles
import BillboardChart from 'react-billboardjs';
import * as d3 from 'd3';
import moment from 'moment';
import { connect } from 'react-redux';

function SymptomChartBB(props) {
  let { start, end, user } = props;
  const symptomData = user.symptomTags;
  const [CHART_DATA, setChartData] = useState({});
  const [CHART_AXIS, setChartAxis] = useState({});
  const [CHART_TOOLTIP, setChartToolTip] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const symptomObj = UTIL_SYMPTOM(symptomData);
  });

  // setChartData({
  //   x: 'x',
  //   json: symptomObj,
  //   type: 'line',
  //   labels: false,
  //   xFormat: '%m-%d-%Y',
  // });
}

const mapState = (state) => {
  return {
    user: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(SymptomChartBB);
