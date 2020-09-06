import React from 'react';
import { UTIL_SYMPTOM_MONTH} from '../utilFcn';
import { Container, Typography } from '@material-ui/core';

const SymptomOverview = (props) => {
  const { start, end, symptom } = props;
  return (
    <Container>
      <Typography>my symptoms</Typography>
    </Container>
  );
};

export const SymptomOverview
