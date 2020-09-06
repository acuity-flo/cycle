import React from 'react';
import { UTIL_SYMPTOM_MONTH} from '../utilFcn';
import { Container, Typography } from '@material-ui/core';

const SymptomOverview = (props) => {
  const { start, end, symptoms } = props;
  let sortedMonth = UTIL_SYMPTOM_MONTH(symptoms, start,end)
  console.log(sortedMonth)
  return (
    <Container>
      <Typography>my symptoms</Typography>
    </Container>
  );
};

export default SymptomOverview
