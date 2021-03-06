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
  UTIL_COST,
} from '../utilFcn';
import { updateUserThunk } from '../store';

export default function FormContainer(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { date, user } = props;
  const period = user.periodTracking;
  const symptom = user.symptomTracking;
  const finance = user.financialTracking;
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
    let purchasesUpdated = purchases
      .filter((el) => el.typeOfPurchase !== '')
      .map((el) => {
        return { ...el, cost: el.cost * 100 };
      });

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
          {period ? (
            <Typography
              variant="body2"
              gutterBottom
              style={{ textAlign: 'center', color: '#DEB88F' }}
            >
              FLOW
            </Typography>
          ) : (
            ''
          )}
          {period ? (
            todayPeriodData[0] ? (
              <Typography
                variant="body2"
                style={{ textAlign: 'center' }}
                gutterBottom
              >
                {todayPeriodData[0].typeOfFlow.slice(0, 1).toUpperCase() +
                  todayPeriodData[0].typeOfFlow.slice(1)}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                style={{ textAlign: 'center' }}
                gutterBottom
              >
                Nothing logged
              </Typography>
            )
          ) : (
            ''
          )}
          <br />
          {symptom ? (
            <Typography
              variant="body2"
              style={{ textAlign: 'center', color: '#8FB5DE' }}
              gutterBottom
            >
              SYMPTOMS
            </Typography>
          ) : (
            ''
          )}
          {symptom ? (
            todaySymptomData[0] ? (
              todaySymptomData[0].symptoms.map((el) => (
                <Typography
                  variant="body2"
                  style={{ textAlign: 'center' }}
                  gutterBottom
                >
                  {el.symptomName.slice(0, 1).toUpperCase() +
                    el.symptomName.slice(1)}
                </Typography>
              ))
            ) : (
              <Typography
                variant="body2"
                style={{ textAlign: 'center' }}
                gutterBottom
              >
                Nothing logged
              </Typography>
            )
          ) : (
            ''
          )}
          <br />
          {finance ? (
            <Typography
              variant="body2"
              style={{ textAlign: 'center', color: '#9BB47A' }}
              gutterBottom
            >
              PURCHASES
            </Typography>
          ) : (
            ''
          )}
          {finance ? (
            todayFinanceData[0] ? (
              todayFinanceData[0].purchases.map((el) => (
                <Typography
                  variant="body2"
                  style={{ textAlign: 'center' }}
                  gutterBottom
                >
                  {el.typeOfPurchase.slice(0, 1).toUpperCase() +
                    el.typeOfPurchase.slice(1)}{' '}
                  : ${UTIL_COST(el.cost)}
                </Typography>
              ))
            ) : (
              <Typography
                variant="body2"
                style={{ textAlign: 'center' }}
                gutterBottom
              >
                Nothing logged
              </Typography>
            )
          ) : (
            ''
          )}
          <Container className={classes.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={toggle}
            >
              update
            </Button>
          </Container>
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
            <Container className={classes.buttonContainer}>
              <Button
                color="primary"
                variant="outlined"
                className={classes.button}
                type="submit"
              >
                Submit
              </Button>
              <Button
                color="primary"
                variant="outlined"
                className={classes.button}
                onClick={toggle}
              >
                Cancel
              </Button>
            </Container>
          ) : (
            <Typography variant="body2">
              You're not currently tracking anything. Please update your
              settings in your Profile!
            </Typography>
          )}
        </form>
      )}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'space-between',
  },
  button: {
    margin: '1em',
    marginTop: '1em',
    backgroundColor: 'white',
    color: '#545454',
  },
}));
