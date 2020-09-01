import React, { Component, useState, useEffect } from "react";

// component and styles
import BillboardChart from "react-billboardjs"
import * as d3 from "d3"
import moment from 'moment'
import { connect } from 'react-redux'


function FinanceChartBB (props) {
  let { start, end, user} = props
  const financeData = user.financial;
  const [CHART_DATA, setChartData] = useState({})
  const [CHART_AXIS, setChartAxis] = useState({})
  const [CHART_TOOLTIP, setChartToolTip] = useState({})
  const [loading, setLoading] = useState(true)

  //map over array with flow util fxn
  useEffect(() => {
    const financeObj = financeData.reduce((acc, el) => {
      if (moment(el.date).isBetween(start, end)) {
        let vals = el.purchases.reduce((innerAcc, innerEl) => {
          if (innerEl.typeOfPurchase === 'prescription') innerAcc.prescription += innerEl.cost
          if (innerEl.typeOfPurchase === 'sanitary product') innerAcc.sanitaryProduct += innerEl.cost
          if (innerEl.typeOfPurchase === 'doctor') innerAcc.doctor += innerEl.cost
          if (innerEl.typeOfPurchase === 'other') innerAcc.other += innerEl.cost
          return innerAcc
        }, {prescription: 0, sanitaryProduct: 0, doctor: 0, other: 0})
        acc.prescription.push(vals.prescription)
        acc.sanitaryProduct.push(vals.sanitaryProduct)
        acc.doctor.push(vals.doctor)
        acc.other.push(vals.other)
        acc.x.push(moment(el.date).format('MM-DD-YYYY'))
      }
      return acc
    }, {prescription: [], sanitaryProduct: [], doctor: [], other:[], x: []})

    setChartData({
      x: "x",
      json: financeObj,
      type: "line",
      labels: false,
      xFormat: "%m-%d-%Y",
    })

    setChartAxis({
      x: {
        // min: moment(start).format('MM-DD-YYYY'),
        // max: moment(end).format('MM-DD-YYYY'),
        min: {
          fit: false,
          value: moment(start).format('MM-DD-YYYY')
        },
        max: {
          fit: false,
          value: moment(end).format('MM-DD-YYYY')
        },
        type: "timeseries"
      },
      range: {
        min: {
          x: moment(start).format('MM-DD-YYYY')
        },
        max: {
          x: moment(end).format('MM-DD-YYYY')
        }
      }
    })

    setChartToolTip({
      format: {
        title: function(x) {
          return d3.timeFormat("%m-%d-%Y")(x);
        }
      }
    })

    setLoading(false)
  }, [user, start, end])



  return (loading ? <h2>loading</h2>: <BillboardChart data={CHART_DATA} axis={CHART_AXIS} tooltip = {CHART_TOOLTIP}/> )
}

const mapState = (state) => {
  return {
    user: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(FinanceChartBB);
