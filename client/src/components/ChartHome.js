import React, { useState } from 'react';
import PeriodChart from '../dataVis/PeriodChart';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import omit from 'lodash/omit';
import 'react-dates/lib/css/_datepicker.css';
import {Button, Container} from '@material-ui/core';

import PeriodChartBB from '../dataVis/PeriodChartBB'

export default function ChartHome() {
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());
  const [focus, setFocus] = useState(null);
  const [choseDate, setDate] = useState(false);

  const defaultProps = {
    //from example
    autoFocus: false,
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,
    numberOfMonths: 2,
    startDatePlaceholderText: 'Start Date',
    endDatePlaceholderText: 'End Date',
  };

  const onDatesChange = ({ startDate, endDate }) => {
    setStart(startDate);
    setEnd(endDate);
  };

  const onFocusChange = (focusedInput) => {
    setFocus(focusedInput);
  };

  // after render need to make false again
  const onClick = () => {
    setDate(true);
    // setTimeout(setDate(false), 1000);
    // return <PeriodChart start={start} end={end} />;
  };

  return (
    <div>
      <Container maxWidth="xs">
      <h2>HOME OF CHARTS</h2>
      <DateRangePicker
        startDate={start}
        startDateId={'start date'}
        endDate={end}
        endDateId={'end date'}
        onDatesChange={onDatesChange}
        focusedInput={focus}
        onFocusChange={onFocusChange}
        {...defaultProps}
        isOutsideRange={() => false}
      />
      <Button onClick={onClick}>set</Button>
      </Container>
      <br />
      <br />
      {choseDate ? <PeriodChart start={start} end={end} /> : ''}
      <br />
      <br />
      <br />
      {choseDate ? <PeriodChartBB start={start} end={end} /> : ''}
      {/* <PeriodChart start={start} end={end} /> */}
      <br />
      <p>click here to see your period data</p>
      <br />
      <h4>symptoms chart</h4>
      <br />
      <p>click here to see your symptoms data</p>
      <br />
      <h4>financial chart</h4>
      <br />
      <p>click here to see your financial data</p>
      <br />
    </div>
  );
}
