import React, { useState } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

// marks for the slider for flow data
const marks = [
  {
    value: 0,
    label: 'None',
  },
  {
    value: 1,
    label: 'Spotting',
  },
  {
    value: 2,
    label: 'Light',
  },
  {
    value: 3,
    label: 'Medium',
  },
  {
    value: 4,
    label: 'Heavy',
  },
];

export default function PeriodForm(props) {
  // user and period data for day opened by the calendar if anything for date
  const { user, date, setFlow, setFlowIdx } = props;

  const todayData = user.period.filter((el, index) => {
    const newDate = el.date.slice(0, 10);
    if (moment(newDate).isSame(date)) {
      setFlowIdx(index);
      return el;
    }
  });

  //set default value for the slider
  let defaultValue = 0;
  if (todayData[0]) {
    if (todayData[0].typeOfFlow === 'spotting') defaultValue = 1;
    if (todayData[0].typeOfFlow === 'light') defaultValue = 2;
    if (todayData[0].typeOfFlow === 'medium') defaultValue = 3;
    if (todayData[0].typeOfFlow === 'heavy') defaultValue = 4;
  }

  //set classes for styles
  const classes = useStyles();

  //loading, error, success messages
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);

  // handle changing the flow value selected
  const handleChange = (evt, newValue) => {
    setFlow(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        FLOW
      </Typography>
      {todayData[0] && (
        <Typography variant="body2" gutterBottom>
          Currently logged: {todayData[0].typeOfFlow}
        </Typography>
      )}
      {!todayData[0] && (
        <Typography variant="body2" gutterBottom>
          Nothing currently logged
        </Typography>
      )}
      <Slider
        defaultValue={defaultValue}
        aria-labelledby="discrete-slider-always"
        step={1}
        valueLabelDisplay="off"
        marks={marks}
        min={0}
        max={4}
        onChange={handleChange}
        className={classes.slider}
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: 400,
  },
  slider: {
    color: '#DEB88F',
  },
});
