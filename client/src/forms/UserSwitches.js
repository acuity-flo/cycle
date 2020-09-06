import React, { useState, useEffect, Fragment } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { updateViewThunk } from '../store'
import { useDispatch } from 'react-redux'

export default function UserSwitch (props) {
  const user = props.user
  const period = user.periodTracking
  const symptom = user.symptomTracking
  const finance = user.financialTracking
  const dispatch = useDispatch()

  const handleChange = (evt) => {
    evt.preventDefault()
    dispatch(updateViewThunk(user.username, evt.target.name, evt.target.checked))
  }

  return (
    <Fragment>
      <FormControlLabel
        control={<Switch checked={period} onChange={handleChange} name="period" />}
        label="Period"
      />
      <FormControlLabel
        control={<Switch checked={symptom} onChange={handleChange} name="symptom" />}
        label="Symptom"
      />
      <FormControlLabel
        control={<Switch checked={finance} onChange={handleChange} name="finance" />}
        label="Finance"
      />
    </Fragment>
  )
}
