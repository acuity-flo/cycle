// import React, { useEffect, useRef } from 'react';
// import moment from 'moment';
// import { connect } from 'react-redux';
// import bb, { bubble } from 'billboard.js'
// import "billboard.js/dist/billboard.css"


// const PeriodChartBB = () => {
//   const generateChart = () => {
//     bb.generate({
//       data: {
//         columns: [
//       ["data1", 30, 350, 200, 380, 150, 250, 50, 80, 55, 220],
//       ["data2", 130, 100, 10, 200, 80, 50, 200, 123, 185, 98],
//       ["data3", 230, 153, 85, 300, 250, 120, 5, 84, 99, 289]
//         ],
//         type: "bubble",
//         labels: true
//       },
//       bubble: {
//         maxR: 50
//       },
//       axis: {
//         x: {
//           type: "category"
//         },
//         y: {
//           max: 450
//         }
//       },
//       bindto: "#bubbleChart"
//     })
//   }


//   useEffect(() => {
//     generateChart()
//   }, [])
//   return (
//     <div id="bubbleChart"></div>
//   )
// }


// class PeriodChartBB extends React.Component {
//   constructor() {
//     this._renderChart = this._renderChart.bind(this)
//   }
//   componentDidMount() {
//     this._renderChart();
//   }

//   _renderChart() {
//     bb.generate({
//       bindto: "#chart",
//       data: {
//         columns: [
//           ["data1", 30, 200, 100, 170, 150, 250],
//           ["data2", 130, 100, 140, 35, 110, 50]
//         ],
//         types: {
//           data1: "line",
//           data2: "area-spline"
//         },
//         colors: {
//           data1: "red",
//           data2: "green"
//         }
//       }
//     });
//   }

//   render() {
//     return <div id="chart"></div>;
//   }
// }

// import React from 'react';
// import {bb} from "billboard.js";
// import "billboard.js/dist/billboard.css";
// import "billboard.js/dist/theme/insight.css"

// export default class PeriodChartBB extends React.Component{
//     constructor(props){
//         super(props);
//         this.chart=null;
//         this.generateCharts = this.generateCharts.bind(this);
//         this.colorPicker    = this.colorPicker.bind(this);
//     }
//      componentDidMount(){
//          this.generateCharts();
//      }
//      colorPicker(){
//          var baseColor ="rgb";
//          var colorArray = ["(128,0,0)","(220,20,60)","(255,215,0)","(128,128,0)","(154,205,50)","(107,142,35)",
//                            "(138,43,226)","(139,0,139)","(255,20,147)","(210,105,30)","(128,128,128)"];
//      var lengthData = this.props.data;
//      var resultColorArray =[];
//      var resultColorObj = {};
//      if(lengthData < 15){
//         resultColorArray = colorArray.slice(0,lengthData);
//      }
//      for(let i =0 ; i < resultColorArray.length;i++ ){
//          let key = this.props.data[i][0];
//          console.log("key value in propseee",this.props.data[i][0])
//          console.log("key value in props",key)
//          let value = baseColor + resultColorArray[i];
//          let tempColorObj = {[key]:value};
//          Object.assign(resultColorObj,tempColorObj);
//       }
//       return resultColorObj;
//         }
//         generateCharts(){
//             var colorObject = this.colorPicker();
//             this.chart = bb.generate({
//                 data:{
//                     columns:[this.props.data],
//                     color: colorObject,
//                     type: "pie",
//                   },
//                   bindto: "#pieChart"
//             });
//         }
//         componentDidUpdate(prevProps){
//             var colorObject = this.colorPicker();
//             this.chart.load({
//                 columns: this.props.data,
//                 color:colorObject
//             });
//         }
//         render(){
//             return(
//                 <div>
//                     <div id ={"statusChart"} ></div>
//                 </div>
//             )
//         }
// }



// export default PeriodChartBB


import React, { Component } from "react";

// component and styles
import BillboardChart from "react-billboardjs";
import * as d3 from "d3"



export default function PeriodChartBB () {
  const CHART_DATA = {
    x: "x",
    json: {
      flow: ["1", "2", "4", "2", "5"],
      // dates 
      x: ["04-01-2015", "04-02-2015", "04-03-2015", "04-04-2015","04-05-2015"]    
    },
    // columns: [
    //   ["data1", 30, 20, 50, 40, 60, 50],
    //   ["data2", 200, 130, 90, 240, 130, 220],
    //   ["data3", 300, 200, 160, 400, 250, 250, 450]
    // ],
    type: "bubble",
    labels: true, 
    xFormat: "%m-%d-%Y", 
    }



  const CHART_XAXIS = {
      x: {
        tick: {
          fit: false,
          count: 5
        },
        type: "timeseries"
      }
  }

  const CHART_TOOLTIP = {
      format: {
        title: function(x) {
      return d3.timeFormat("%m-%d-%Y")(x);
     }
      }
  }

  return (<BillboardChart data={CHART_DATA} axis={CHART_XAXIS} tooltip = {CHART_TOOLTIP}/>)
}

