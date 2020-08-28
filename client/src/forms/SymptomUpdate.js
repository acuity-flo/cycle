import React, { useState } from 'react'
import { Button, FormGroup, Checkbox, FormControl, FormControlLabel, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { addSymptomData } from '../store'

export default function SymptomUpdate (props) {
  const user = props.user
  const classes = useStyles()
  const dispatch = useDispatch()
  const [symptoms, setSymptoms] = useState([
    {
      name: 'stressed',
      category: 'mood',
      bool: false
    },
    {
      name: 'anxious',
      category: 'mood',
      bool: false
    },
    {
      name: 'cramps',
      category: 'pain',
      bool: false
    },
    {
      name: 'nausea',
      category: 'physical',
      bool: false
    }])

  // ['stressed', 'calm', 'motivated', 'unmotivated', 'happy', 'sad', 'angry', 'frustrated', 'anxious', 'cramps', 'headache', 'backpain', 'nausea', 'indigestion', 'snacky', 'fatigue', 'PMS']

  const handleChange = (evt) => {
    const newSymptoms = [...symptoms]
    newSymptoms[evt.target.name].bool = evt.target.checked
    setSymptoms(newSymptoms)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log('original user symptoms', user.symptomTags)
    const updatedSymptoms = symptoms.reduce((acc, el) => {
      if (el.bool) {
        const obj = {
          symptomName: el.name,
          category: el.category
        }
        acc.push(obj)
      }
      return acc
    }, [])
    const symptomsObj = {
      date: props.date,
      symptoms: updatedSymptoms
    }
    const newSymptomsTagsArr = [...user.symptomTags, symptomsObj]
    console.log('newSymptomsTagsArr', newSymptomsTagsArr)
    dispatch(addSymptomData(user.username, newSymptomsTagsArr))
  }

  return (
    <div>
      <Typography id="discrete-slider-restrict" gutterBottom>
      Symptoms
      </Typography>
      <FormControl component="symptoms">
        <FormGroup>
          {symptoms.map((el, index)=> (
            <FormControlLabel
              control={<Checkbox onChange={handleChange} value={el.name} name={index} checked={el.bool} />}
              label={el.name}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Button onClick={handleSubmit}>Update Symptoms</Button>
    </div>

  )
}

const useStyles = makeStyles({

});
