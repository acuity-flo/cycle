import React from 'react';
import { UTIL_FINANCE, UTIL_FINANCE_TOTALS } from '../utilFcn';
import { Container, Typography } from '@material-ui/core';

const SymptomOverview = (props) => {
  const { start, end, period } = props;
  return (
    <Container>
      <Typography>my symptoms</Typography>
    </Container>
  );
};
