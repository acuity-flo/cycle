import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import PeriodUpdate from "./PeriodUpdate";
import SymptomUpdate from "./SymptomUpdate";
import FinanceUpdate from "./FinanceUpdate";
import {UTIL_SYMPTOM_REDUCE, UTIL_PERIOD_STR} from "../utilFcn"
import { updateUserThunk } from "../store";

export default function FormContainer(props) {
  const { date, user } = props;
  const [symptoms, setSymptoms] = useState([]);
  const [flow, setFlow] = useState(0);
  const [purchases, setPurchases] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const symptomsReduce = UTIL_SYMPTOM_REDUCE(symptoms)
    const flowStr = UTIL_PERIOD_STR (flow)
    const purchasesUpdated = purchases.filter((el) => el.typeOfPurchase !== "")

    const update = {
      date, 
      username: user.username,
      financeUpdate: purchasesUpdated, 
      symptomUpdate: symptomsReduce, 
      flowUpdate: flowStr
    }

    dispatch(updateUserThunk(update))
  };

  return (
    <form onSubmit={handleSubmit}>
      <PeriodUpdate date={date} user={user} setFlow = {setFlow} flow={flow}/>
      <SymptomUpdate
        date={date}
        user={user}
        setSymptoms={setSymptoms}
        symptoms={symptoms}
      />
      <FinanceUpdate date={date} user={user} setPurchases={setPurchases} purchases = {purchases}/>
      <Button type="submit">Submit</Button>
    </form>
  );
}
