import React, {useState} from 'react';
import PeriodChart from '../dataVis/PeriodChart';
import 'react-dates/initialize'
import { DateRangePicker} from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import omit from 'lodash/omit';
import 'react-dates/lib/css/_datepicker.css';



export default function ChartHome() { 
  const [start, setStart] = useState(moment())
  const [end, setEnd] = useState(moment())
  const [focus, setFocus] = useState(null)
  // console.log(start)

  const defaultProps = {
    //from example
    autoFocus: false,
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,
    numberOfMonths:2, 
    startDatePlaceholderText: 'Start Date',
    endDatePlaceholderText: 'End Date',
  }

  const onDatesChange = ({startDate, endDate}) => {
    setStart(startDate)
    setEnd(endDate)
  }

  const onFocusChange = (focusedInput) => {
    setFocus(focusedInput)
  }
  

  return (
    <div>
      <h2>HOME OF CHARTS</h2>
      <DateRangePicker
          startDate={start} 
          startDateId={"start date"}
          endDate={end}
          endDateId={"end date"}
          onDatesChange={onDatesChange} 
          focusedInput={focus} 
          onFocusChange={onFocusChange} 
          {...defaultProps}
      />
      <br />
      <br />
      <PeriodChart />
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


