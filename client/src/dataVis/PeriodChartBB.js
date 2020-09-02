import React, { Component, useEffect } from "react";

// component and styles
import BillboardChart from "react-billboardjs";
import * as d3 from "d3"
import moment from 'moment';
import { connect } from 'react-redux';


function PeriodChartBB (props) {
  let { start, end, user} = props;
  let CHART_AXIS, CHART_TOOLTIP, CHART_DATA
  
  const flow = (element) => {
    if (element.typeOfFlow === 'spotting') {
      element.typeOfFlow = "1";
    } else if (element.typeOfFlow === 'light') {
      element.typeOfFlow = "2";
    } else if (element.typeOfFlow === 'medium') {
      element.typeOfFlow = "3";
    } else if (element.typeOfFlow === 'heavy') {
      element.typeOfFlow = "4";
    }

    element.date = moment(element.date.slice(0,10)).format('MM-DD-YYYY');
    return element;
  }

  const periodData = user.period;

  //map over array with flow util fxn
  const flowObj = periodData.reduce((acc, el) => {

    if (moment(el.date).isBetween(start, end)) {
      let data = flow(el)
      acc.flow.push(data.typeOfFlow)
      acc.x.push(data.date)
    }
    return acc
  }, {flow: [], x: []});


  CHART_DATA = {
    x: "x",
    json: flowObj,
    type: "bubble",
    labels: false,
    xFormat: "%m-%d-%Y",
  }

  CHART_AXIS = {
    x: {
      tick: {
        fit: true
      },
      type: "timeseries"
    },
    y: {
      tick: {
        outer: true,
        format: function(y) {
          if (y === 1) {
            return "spotting"
          }
          if (y === 2) {
            return "light"
          }
          if (y === 3) {
            return "medium"
          }
          if (y === 4) {
            return "heavy"
          }
        }
      }
    }
  }


    CHART_TOOLTIP = {
      format: {
        title: function(x) {
          return d3.timeFormat("%m-%d-%Y")(x);
        }
      }
    }

  return ((CHART_DATA && CHART_AXIS && CHART_TOOLTIP) ? <BillboardChart data={CHART_DATA} axis={CHART_AXIS} tooltip = {CHART_TOOLTIP}/> : <></>)
}


const mapState = (state) => {
  return {
    user: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(PeriodChartBB);
