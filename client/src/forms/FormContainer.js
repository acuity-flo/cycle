import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import PeriodUpdate from './PeriodUpdate';
import SymptomUpdate from './SymptomUpdate';
import FinanceUpdate from './FinanceUpdate';
import { UTIL_SYMPTOM_REDUCE, UTIL_PERIOD_STR } from '../utilFcn';
import { updateUserThunk } from '../store';

export default function FormContainer(props) {
  const { date, user } = props;
  const period = user.periodTracking
  const symptom = user.symptomTracking
  const finance = user.financialTracking

  const [symptoms, setSymptoms] = useState([]);
  const [flow, setFlow] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [symptomsIdx, setSymptomsIdx] = useState(undefined);
  const [financeIdx, setFinanceIdx] = useState(undefined);
  const [flowIdx, setFlowIdx] = useState(undefined);

  const dispatch = useDispatch();

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
    <form onSubmit={handleSubmit}>
      {period ?  <PeriodUpdate
        date={date}
        user={user}
        setFlow={setFlow}
        flow={flow}
        flowIdx={flowIdx}
        setFlowIdx={setFlowIdx}
      /> : ''}

      {symptom ? <SymptomUpdate
        date={date}
        user={user}
        setSymptoms={setSymptoms}
        symptoms={symptoms}
        symptomsIdx={symptomsIdx}
        setSymptomsIdx={setSymptomsIdx}
      /> :''}

      {finance ? <FinanceUpdate
        date={date}
        user={user}
        setPurchases={setPurchases}
        purchases={purchases}
        financeIdx={financeIdx}
        setFinanceIdx={setFinanceIdx}
      /> : ''}
 
        {period || symptom || finance ? <Button type="submit">Submit</Button> : <p>You're not currently tracking anything. Please update your settings in your Profile!</p>}
    </form>
  );
}
