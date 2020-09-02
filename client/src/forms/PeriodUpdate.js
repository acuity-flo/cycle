import React, { useState } from "react";
import { Button, Slider, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import moment from "moment";

//thunk
import { addPeriodData, updateUserThunk } from "../store";

// marks for the slider for flow data
const marks = [
  {
    value: 0,
    label: "None",
  },
  {
    value: 1,
    label: "Spotting",
  },
  {
    value: 2,
    label: "Light",
  },
  {
    value: 3,
    label: "Medium",
  },
  {
    value: 4,
    label: "Heavy",
  },
];

export default function PeriodForm(props) {
  // user and period data for day opened by the calendar if anything for date
  const { user, date, flow, setFlow } = props;

  let todayDataIdx = undefined;
  const todayData = user.period.filter((el, index) => {
    if (moment(el.date).isSame(props.date)) {
      todayDataIdx = index;
      return el;
    }
  });
  //set default value for the slider
  let defaultValue = 0;
  if (todayData[0]) {
    if (todayData[0].typeOfFlow === "spotting") defaultValue = 1;
    if (todayData[0].typeOfFlow === "light") defaultValue = 2;
    if (todayData[0].typeOfFlow === "medium") defaultValue = 3;
    if (todayData[0].typeOfFlow === "heavy") defaultValue = 4;
  }

  //set classes for styles
  const classes = useStyles();

  //to dispatch thunk
  const dispatch = useDispatch();

  //set flow to 0 and if not updated then the thunk won't run
  // const [flow, setFlow] = useState(0);

  //loading, error, success messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // handle changing the flow value selected
  const handleChange = (evt, newValue) => {
    setFlow(newValue);
  };

  //handle submit for the flow update
  // const handleSubmit = (evt) => {
  //   evt.preventDefault()
  //   dispatch(updateUserThunk('period', user.username, flow, date, todayDataIdx))

  //   // // only run if when the flow was changed from 0
  //   // // run elif when flow is 0, but there was data for the day originally
  //   // if (flow > 0) {
  //   //   //set updated Period typeOfFlow for dispatch
  //   //   let updatedPeriod, typeOfFlow;
  //   //   if (flow === 1) {
  //   //     typeOfFlow = "spotting";
  //   //   } else if (flow === 2) {
  //   //     typeOfFlow = "light";
  //   //   } else if (flow === 3) {
  //   //     typeOfFlow = "medium";
  //   //   } else if (flow === 4) {
  //   //     typeOfFlow = "heavy";
  //   //   }

  //   //   // if there was data for today, reset vals and dispatch
  //   //   //else construct obj and push obj
  //   //   if (todayDataIdx !== undefined) {
  //   //     updatedPeriod = [...props.user.period];
  //   //     updatedPeriod[todayDataIdx].typeOfFlow = typeOfFlow;
  //   //   } else {
  //   //     updatedPeriod = [...props.user.period, {
  //   //       date: props.date,
  //   //       typeOfFlow,
  //   //     }];
  //   //   }

  //   //   //dispatch thunk
  //   //   dispatch(addPeriodData(user.username, updatedPeriod));
  //   //   // setLoading(false)
  //   //   // setSuccess(true)
  //   // } else if (todayDataIdx !== undefined) {
  //   //   let updatedPeriod = [...props.user.period];

  //   //   //remove obj from array when reset to 0
  //   //   updatedPeriod = updatedPeriod.splice(todayDataIdx, 1);

  //   //   //dispatch thunk
  //   //   dispatch(addPeriodData(user.username, updatedPeriod));
  //   // }
  // };

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
      />
      {/* {success && <p>Added successfully!</p>}
      {loading && <p>Loading</p>} */}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});
