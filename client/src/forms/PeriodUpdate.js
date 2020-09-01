import React, { useState } from 'react';
import { addPeriodData } from '../store';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import {
  Button,
  Slider,
  Typography,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const marks = [
  {
    value: 0,
    label: '',
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
  const user = props.user
  const todayData = user.period.filter(el => moment(el.date).isSame(props.date))
  const classes = useStyles();
  const [flow, setFlow] = useState(0)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  let defaultValue = 0
  if (todayData[0]) {
    if (todayData[0].typeOfFlow === "spotting") defaultValue = 1
    if (todayData[0].typeOfFlow === "light") defaultValue = 2
    if (todayData[0].typeOfFlow === "medium") defaultValue = 3
    if (todayData[0].typeOfFlow === "heavy") defaultValue = 4
  }


  const handleChange = (evt, newValue) => {
    setFlow(newValue)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // setLoading(true)
    if(flow>0){
      const periodObj = {}
      periodObj.date = props.date
      if(flow === 1){
        periodObj.typeOfFlow = "spotting"
      } else if (flow === 2){
        periodObj.typeOfFlow = "light"
      } else if (flow === 3){
        periodObj.typeOfFlow = "medium"
      } else if (flow === 4){
      periodObj.typeOfFlow = "heavy"
      }
      let bool = true
      let updatedPeriod = props.user.period.map(el => {
        if (moment(el.date).isSame(periodObj.date)) {
          bool = false
          el.typeOfFlow = periodObj.typeOfFlow
          return el
        } else {
          return el
        }
      })

      if(bool) {
        updatedPeriod = [...props.user.period, periodObj]
      }
      dispatch(addPeriodData(props.user.username, updatedPeriod))
      // setLoading(false)
      // setSuccess(true)
    }

  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        FLOW
      </Typography>
      {todayData[0] && <Typography variant="body2" gutterBottom>
        Currently logged: {todayData[0].typeOfFlow}
      </Typography>}
      {!todayData[0] && <Typography variant="body2" gutterBottom>
        Nothing currently logged
      </Typography>}
      <Slider
        defaultValue={defaultValue}
        aria-labelledby="discrete-slider-always"
        step={1}
        valueLabelDisplay="off"
        marks={marks}
        min ={0.75}
        max = {4}
        onChange = {handleChange}
      />
      {/* {success && <p>Added successfully!</p>}
      {loading && <p>Loading</p>} */}
      <Grid container justify="center">
        <Button color="primary" onClick = {handleSubmit}>Update Data</Button>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});
