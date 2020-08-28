import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { connect } from 'react-redux';

function PeriodChart(props) {
  const d3Contatiner = useRef(null);

  let start = props.start;
  let end = props.end;
  //   if (start) start = start.format('MM DD YYYY');
  //   if (end) end = end.format('MM DD YYYY');

  console.log('start in period chart', start);
  console.log('end in period chart', end);

  //utility function for changing date format and adding weight to period level
  const flow = (element) => {
    if (element.typeOfFlow === 'spotting') {
      element.typeOfFlow = 1;
    } else if (element.typeOfFlow === 'light') {
      element.typeOfFlow = 2;
    } else if (element.typeOfFlow === 'medium') {
      element.typeOfFlow = 3;
    } else if (element.typeOfFlow === 'heavy') {
      element.typeOfFlow = 4;
    }

    //manipulates period arr on state
    element.date = moment(element.date).format('MM DD YYYY');
    return element;
  };

  //useEffect depends on period date to be called
  useEffect(() => {
    if (props.user.username && d3Contatiner.current && start && end) {
      //period data from user
      const periodData = props.user.period;

      //map over array with flow util fxn
      const flowArr = periodData.map((el) => flow(el));

      //periodMin is lowest date, periodMax is largest
      //   const periodMin = moment(d3.min(flowArr.map((el) => el.date)));
      //   const periodMax = moment(d3.max(flowArr.map((el) => el.date)));
      const periodMin = start;
      const periodMax = end;
      console.log('period min', periodMin, 'period max', periodMax);

      //find the range of the min and max
      const periodRange = periodMax.diff(periodMin, 'days') + 1;
      console.log('periodrange', periodRange);

      //set height and width of the canvas
      const canvasHeight = 400;
      const canvasWidth = 1000;
      // set the width between ticks in xAxis
      //minus 100 to account for x axis shift 50 width value to the left, then have it end 50 from right
      const tickWidth = (canvasWidth - 100) / periodRange;

      //X AXIS && SCALE
      let xScale = d3
        .scaleTime()
        .domain([periodMin.subtract(1, 'days'), periodMax])
        .range([0, canvasWidth - 100]);

      let xAxis = d3.axisBottom().scale(xScale).ticks(periodRange);

      console.log('D3 current', d3Contatiner.current)
      console.log('d3contatiner', d3Contatiner)
      const svg = d3
        .select(d3Contatiner.current)
      

      svg.selectAll('g')
        .remove()

      svg
        .attr('width', canvasWidth)
        .attr('height', canvasHeight)
        .style('border', '2px solid pink');

      //moves axis 50 to left of canvas start and 40 from bottom and adds the axis
      svg
        .append('g')
        .attr('transform', `translate(50,${canvasHeight - 40})`)
        .call(xAxis);

      // //CIRCLES
      // //cx uses the 50 width value from above x axis shift then multiplies value.date-periodMin (0,1,2,etc) by the tickWidth above
      // // -----WORKING BELOW-----
      svg
        .append('g')
        .selectAll('circle')
        .data(flowArr)
        .join(
          (enter) =>
            enter
              .append('circle')
              .attr('class', 'circles')
              .attr(
                'cx',
                (value) =>
                  periodRange * 17 +
                  tickWidth * moment(value.date).diff(periodMin, 'days')
              )
              .attr('cy', 250)
              .attr('r', (value) => value.typeOfFlow * 10)
              .attr('fill', 'red'),
          (exit) => exit.remove()
        );



      // .enter()
      // .append('circle')
      // .attr('class', 'circles')
      // .attr('cx', (value) => {
      //   return (
      //     periodRange * 17 +
      //     tickWidth * moment(value.date).diff(periodMin, 'days')
      //   );
      // })
      // .attr('cy', 250)
      // .attr('r', (value) => value.typeOfFlow * 10)
      // .attr('fill', 'red');
    }
    //below is dependency for useEffect, depends on user data
  }, [props.user, props.start, props.end]);

  return (
    <div>
      <h1>PERIOD</h1>
      <svg
        className="d3Component"
        width={400}
        height={200}
        ref={d3Contatiner}
      />
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state,
    isLoggedIn: !!state.id,
  };
};

export default connect(mapState)(PeriodChart);
