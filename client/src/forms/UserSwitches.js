import React, { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
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
  // const [state, setState] = useState({
  //   period: true,
  //   symptom: true,
  //   finance: true,
  // })

  // useEffect(() => {
  //   setState({
  //     period: user.periodTracking,
  //     symptom: user.symptomTracking,
  //     finance: user.financialTracking
  //   })
  // })

  const handleChange = (evt) => {
    evt.preventDefault()
    dispatch(updateViewThunk(user.username, evt.target.name, evt.target.checked))
  }

  return (
    <FormGroup>
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
    </FormGroup>
  )
}