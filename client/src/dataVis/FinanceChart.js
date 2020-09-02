import React, { Component, useState, useEffect } from "react";

// component and styles
import BillboardChart from "react-billboardjs"
import * as d3 from "d3"
import moment from 'moment'
import { connect } from 'react-redux'


function FinanceChartBB (props) {
  let { start, end, user} = props
  const financeData = user.financial;

    const financeObj = financeData.reduce((acc, el) => {
      if (moment(el.date).isBetween(start, end)) {
        const dateChange = el.date.slice(0,10)
        let vals = el.purchases.reduce((innerAcc, innerEl) => {
          if (innerEl.typeOfPurchase === 'prescription') innerAcc.prescription += innerEl.cost
          if (innerEl.typeOfPurchase === 'sanitary products') innerAcc.sanitaryProduct += innerEl.cost
          if (innerEl.typeOfPurchase === 'doctor') innerAcc.doctor += innerEl.cost
          if (innerEl.typeOfPurchase === 'other') innerAcc.other += innerEl.cost
          return innerAcc
        }, {prescription: 0, sanitaryProduct: 0, doctor: 0, other: 0})
        acc.prescription.push(vals.prescription)
        acc.sanitaryProduct.push(vals.sanitaryProduct)
        acc.doctor.push(vals.doctor)
        acc.other.push(vals.other)
        acc.x.push(moment(dateChange).format('MM-DD-YYYY'))
      }
      return acc
    }, {prescription: [], sanitaryProduct: [], doctor: [], other:[], x: []})

 
    let CHART_DATA = {
      x: "x",
      json: financeObj,
      type: "line",
      labels: false,
      xFormat: "%m-%d-%Y",
    }

    let CHART_AXIS = {
      x: {
        type: "timeseries",
        tick: {
          fit: true,
        },
      },
    }

    let CHART_TOOLTIP = {
      format: {
        title: function(x) {
          return d3.timeFormat("%m-%d-%Y")(x);
        }
      }
    }

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

export default connect(mapState)(FinanceChartBB);
