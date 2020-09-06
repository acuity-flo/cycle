import React, { useState, useEffect, Fragment } from 'react';
import { Container, Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PeriodUpdate from './PeriodUpdate';
import SymptomUpdate from './SymptomUpdate';
import FinanceUpdate from './FinanceUpdate';
import {
  UTIL_SYMPTOM_REDUCE,
  UTIL_PERIOD_STR,
  UTIL_FINANCE_TODAY_DATA,
  UTIL_PERIOD_TODAY_DATA,
  UTIL_SYMPTOM_TODAY_DATA,
} from '../utilFcn';
import { updateUserThunk } from '../store';

export default function FormContainer(props) {
  const classes = useStyles();
  const { date, user, message } = props;
  const period = user.periodTracking;
  const symptom = user.symptomTracking;
  const finance = user.financialTracking;
  const [open, setOpen] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [flow, setFlow] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [symptomsIdx, setSymptomsIdx] = useState(undefined);
  const [financeIdx, setFinanceIdx] = useState(undefined);
  const [flowIdx, setFlowIdx] = useState(undefined);
  const [todayFinanceData, setTodayFinanceData] = useState([]);
  const [todayPeriodData, setTodayPeriodData] = useState([]);
  const [todaySymptomData, setTodaySymptomData] = useState([]);
  const dispatch = useDispatch();

  const loadData = () => {
    setTodayFinanceData(UTIL_FINANCE_TODAY_DATA(user, date));
    setTodayPeriodData(UTIL_PERIOD_TODAY_DATA(user, date));
    setTodaySymptomData(UTIL_SYMPTOM_TODAY_DATA(user, date));
  };

  const toggle = () => setOpen(!open);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const symptomsReduce = UTIL_SYMPTOM_REDUCE(symptoms);
    const flowStr = UTIL_PERIOD_STR(flow);
    const purchasesUpdated = purchases.filter((el) => el.typeOfPurchase !== '');
    const update = {
      date,
      username: user.username,
      financeUpdate: purchasesUpdated,
      financeIdx,
      symptomUpdate: symptomsReduce,
      symptomsIdx,
      flowUpdate: flowStr,
      flowIdx,
    };
    dispatch(updateUserThunk(update));
    toggle();
  };

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <Container>
      {!open && (
        <Fragment>
          <Typography variant="h6">CURRENTLY LOGGED</Typography>
          <Typography variant="body2" gutterBottom>
            {todayPeriodData[0]
              ? `Flow: ${
                  todayPeriodData[0].typeOfFlow.slice(0, 1).toUpperCase() +
                  todayPeriodData[0].typeOfFlow.slice(1)
                }`
              : 'Flow: Nothing logged'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {todaySymptomData[0]
              ? `Symptoms: ${todaySymptomData[0].symptoms
                  .map(
                    (el) =>
                      el.symptomName.slice(0, 1).toUpperCase() +
                      el.symptomName.slice(1)
                  )
                  .join(' | ')}`
              : 'Symptoms: Nothing logged'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {todayFinanceData[0]
              ? `Purchases: ${todayFinanceData[0].purchases.map(
                  (el) =>
                    `${
                      el.typeOfPurchase.slice(0, 1).toUpperCase() +
                      el.typeOfPurchase.slice(1)
                    }: $${el.cost}`
                )}`
              : 'Purchases: Nothing logged'}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={toggle}
          >
            update
          </Button>
        </Fragment>
      )}
      {open && (
        <form onSubmit={handleSubmit}>
          {period ? (
            <PeriodUpdate
              date={date}
              user={user}
              setFlow={setFlow}
              flow={flow}
              flowIdx={flowIdx}
              setFlowIdx={setFlowIdx}
            />
          ) : (
            ''
          )}

          {symptom ? (
            <SymptomUpdate
              date={date}
              user={user}
              setSymptoms={setSymptoms}
              symptoms={symptoms}
              symptomsIdx={symptomsIdx}
              setSymptomsIdx={setSymptomsIdx}
            />
          ) : (
            ''
          )}

          {finance ? (
            <FinanceUpdate
              date={date}
              user={user}
              setPurchases={setPurchases}
              purchases={purchases}
              financeIdx={financeIdx}
              setFinanceIdx={setFinanceIdx}
            />
          ) : (
            ''
          )}

          {period || symptom || finance ? (
            <Button type="submit">Submit</Button>
          ) : (
            <p>
              You're not currently tracking anything. Please update your
              settings in your Profile!
            </p>
          )}
        </form>
      )}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0.5em',
    backgroundColor: 'white',
    color: '#545454',
  },
}));
