import React, { useState } from 'react';
import { addPeriodData } from '../store';
import { useDispatch } from 'react-redux';
import {
  Button,
  Slider,
  Typography
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
  const classes = useStyles();
  const [flow, setFlow] = useState(0)
  const dispatch = useDispatch()

  const handleChange = (evt, newValue) => {
    setFlow(newValue)
  }

  const handleSubmit = (evt) => {
    console.log("IM HANDLING", flow)
    evt.preventDefault()

    if(flow>0){
      const periodObj = {}
      periodObj["date"] = props.date
      if(flow === 1){
        periodObj["typeOfFlow"] = "spotting"
      } else if (flow === 2){
        periodObj["typeOfFlow"] = "light"
      } else if (flow === 3){
        periodObj["typeOfFlow"] = "medium"
      } else if (flow === 4){
      periodObj["typeOfFlow"] = "heavy"
      }

      let updatedPeriod = []
      if(props.user.period) {
        updatedPeriod = [...props.user.period, periodObj]
      } else {
        updatedPeriod = [periodObj]
      }

      console.log(updatedPeriod , "Updated Period")
      dispatch(addPeriodData(props.user.username, updatedPeriod))
    }  

  }


  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        FLOW
      </Typography>
      <Slider
        defaultValue={0}
        aria-labelledby="discrete-slider-always"
        step={1}
        valueLabelDisplay="off"
        marks={marks}
        min ={0.75}
        max = {4}
        onChange = {handleChange}
      />
      <Button onClick = {handleSubmit}>Add Period</Button>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});