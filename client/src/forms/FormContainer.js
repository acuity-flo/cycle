import React, { useState } from 'react';
import {
  Container,
  Button,
  makeStyles,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core';
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
  const { date, user } = props;
  const period = user.periodTracking;
  const symptom = user.symptomTracking;
  const finance = user.financialTracking;
  const [scroll, setScroll] = React.useState('paper');
  const [open, setOpen] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [flow, setFlow] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [symptomsIdx, setSymptomsIdx] = useState(undefined);
  const [financeIdx, setFinanceIdx] = useState(undefined);
  const [flowIdx, setFlowIdx] = useState(undefined);

  const todayFinanceData = UTIL_FINANCE_TODAY_DATA(user, date);
  const todayPeriodData = UTIL_PERIOD_TODAY_DATA(user, date);
  const todaySymptomData = UTIL_SYMPTOM_TODAY_DATA(user, date);
  // console.log(todaySymptomData, 'today symptoms');

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

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
  };
  return (
    <Container>
      {todayPeriodData && (
        <Typography variant="body2" gutterBottom>
          Today's Flow: {todayPeriodData[0].typeOfFlow}
        </Typography>
      )}
      {todayFinanceData && todayFinanceData.length && (
        <Typography variant="body2" gutterBottom>
          Today's Purchases:{' '}
          {todayFinanceData[0].purchases.map((el) => (
            <p>
              {el.typeOfPurchase.toUpperCase()}: {el.cost}
            </p>
          ))}
        </Typography>
      )}
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={() => {
          setOpen(true);
        }}
      >
        add or update
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        classes={classes.dialogBox}
      >
        <DialogContent className={classes.paper}>
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
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              setOpen(false);
            }}
          >
            close
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0.5em',
    backgroundColor: 'white',
    color: '#545454',
  },
  dialogBox: {
    padding: '2em',
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
