import React, { useState, useEffect } from 'react'
import { Button, FormGroup, Checkbox, FormControl, FormControlLabel, Typography, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { addSymptomData } from '../store'

export default function SymptomUpdate (props) {
  const user = props.user
  const todayData = props.user.symptomTags.filter(el => moment(el.date).isSame(props.date))
  const classes = useStyles()
  const dispatch = useDispatch()
  const [symptoms, setSymptoms] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    setSymptoms([
      {
        name: 'stressed',
        category: 'mood',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'stressed') ? true : false
      },
      {
        name: 'calm',
        category: 'mood',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'calm') ? true : false
      },
      {
        name: 'motivated',
        category: 'mood',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'motivated') ? true : false
      },
      {
        name: 'unmotivated',
        category: 'mood',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'unmotivated') ? true : false
      },
      {
        name: 'happy',
        category: 'emotion',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'happy') ? true : false
      },
      {
        name: 'sad',
        category: 'emotion',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'sad') ? true : false
      },
      {
        name: 'angry',
        category: 'emotion',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'angry') ? true : false
      },
      {
        name: 'frustrated',
        category: 'emotion',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'frustrated') ? true : false
      },
      {
        name: 'anxious',
        category: 'emotion',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'anxious') ? true : false
      },
      {
        name: 'cramps',
        category: 'pain',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'cramps') ? true : false
      },
      {
        name: 'headache',
        category: 'pain',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'headache') ? true : false
      },
      {
        name: 'back pain',
        category: 'pain',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'back pain') ? true : false
      },
      {
        name: 'nausea',
        category: 'physical',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'nausea') ? true : false
      },
      {
        name: 'bloating',
        category: 'physical',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'bloating') ? true : false
      },
      {
        name: 'indigestion',
        category: 'physical',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'indigestion') ? true : false
      },
      {
        name: 'fatigue',
        category: 'physical',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'fatigue') ? true : false
      },
      {
        name: 'snacky',
        category: 'physical',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'snacky') ? true : false
      },
      {
        name: 'pms',
        category: 'physical',
        bool: todayData[0] && todayData[0].symptoms.some(el => el.symptomName === 'pms') ? true : false
      },
    ])
  }

  const handleChange = (evt) => {
    const newSymptoms = [...symptoms]
    newSymptoms[evt.target.name].bool = evt.target.checked
    setSymptoms(newSymptoms)
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
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

    let newSymptomsTagsArr
    if(todayData[0]) {
      newSymptomsTagsArr = user.symptomTags.map(el => {
        if (moment(el.date).isSame(props.date)) {
          el.symptoms = updatedSymptoms
          return el
        } else {
          return el
        }
      })
    } else {
      newSymptomsTagsArr = [...user.symptomTags, symptomsObj]
    }

    dispatch(addSymptomData(user.username, newSymptomsTagsArr))
  }

  useEffect(() => {
    loadData()
    setLoading(false)
  }, [props.user])

  if (loading) return <CircularProgress />

  return (
    <>
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
    </>

  )
}

const useStyles = makeStyles({

});
