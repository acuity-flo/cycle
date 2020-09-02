import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import PeriodUpdate from "./PeriodUpdate";
import SymptomUpdate from "./SymptomUpdate";
import FinanceUpdate from "./FinanceUpdate";

export default function FormContainer(props) {
  const { date, user } = props;
  const [symptoms, setSymptoms] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("evt form container", evt);
    console.log("symptoms form container", symptoms);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PeriodUpdate date={date} user={user} />
      <SymptomUpdate
        date={date}
        user={user}
        setSymptoms={setSymptoms}
        symptoms={symptoms}
      />
      <FinanceUpdate date={date} user={user} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
