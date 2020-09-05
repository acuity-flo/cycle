import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import moment from 'moment';

export default function SymptomUpdate(props) {
  // user and symptom data for day opened by the calendar if anything for date
  const { user, date, setSymptoms, symptoms, setSymptomsIdx } = props;

  const todayData = user.symptomTags.filter((el, index) => {
    const newDate = el.date.slice(0, 10);
    if (moment(newDate).isSame(date)) {
      setSymptomsIdx(index);
      return el;
    }
  });

  //set symptoms to empty array to start

  const [loading, setLoading] = useState(true);

  //called in useEffect, loads data to symptoms on state
  const loadData = () => {
    setSymptoms([
      {
        name: 'stressed',
        category: 'mood',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'stressed')
            ? true
            : false,
      },
      {
        name: 'calm',
        category: 'mood',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'calm')
            ? true
            : false,
      },
      {
        name: 'motivated',
        category: 'mood',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'motivated')
            ? true
            : false,
      },
      {
        name: 'unmotivated',
        category: 'mood',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'unmotivated')
            ? true
            : false,
      },
      {
        name: 'happy',
        category: 'emotion',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'happy')
            ? true
            : false,
      },
      {
        name: 'sad',
        category: 'emotion',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'sad')
            ? true
            : false,
      },
      {
        name: 'angry',
        category: 'emotion',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'angry')
            ? true
            : false,
      },
      {
        name: 'frustrated',
        category: 'emotion',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'frustrated')
            ? true
            : false,
      },
      {
        name: 'anxious',
        category: 'emotion',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'anxious')
            ? true
            : false,
      },
      {
        name: 'cramps',
        category: 'pain',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'cramps')
            ? true
            : false,
      },
      {
        name: 'headache',
        category: 'pain',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'headache')
            ? true
            : false,
      },
      {
        name: 'back pain',
        category: 'pain',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'back pain')
            ? true
            : false,
      },
      {
        name: 'nausea',
        category: 'physical',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'nausea')
            ? true
            : false,
      },
      {
        name: 'bloating',
        category: 'physical',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'bloating')
            ? true
            : false,
      },
      {
        name: 'indigestion',
        category: 'physical',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'indigestion')
            ? true
            : false,
      },
      {
        name: 'fatigue',
        category: 'physical',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'fatigue')
            ? true
            : false,
      },
      {
        name: 'snacky',
        category: 'physical',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'snacky')
            ? true
            : false,
      },
      {
        name: 'pms',
        category: 'physical',
        bool:
          todayData[0] &&
          todayData[0].symptoms.some((el) => el.symptomName === 'pms')
            ? true
            : false,
      },
    ]);
  };

  const handleChange = (evt) => {
    const newSymptoms = [...symptoms];
    newSymptoms[evt.target.name].bool = evt.target.checked;
    setSymptoms(newSymptoms);
  };

  useEffect(() => {
    loadData();
    setLoading(false);
  }, [props.user]);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="body2" gutterBottom>
        SYMPTOMS
      </Typography>
      <FormControl component="symptoms">
        <FormGroup>
          {symptoms.map((el, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleChange}
                  value={el.name}
                  name={index}
                  checked={el.bool}
                />
              }
              label={el.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </>
  );
}
