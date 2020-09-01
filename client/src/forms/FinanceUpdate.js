import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Input,
  InputLabel,
  Select,
  Typography,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import moment from "moment";

//thunk
import { addFinanceData } from "../store";

export default function FinanceUpdate(props) {
  //user and finance data for day opened by the calendar, if anything for that date
  const user = props.user;
  let todayDataIdx = undefined;
  const todayData = user.financial.filter((el, index) => {
    if (moment(el.date).isSame(props.date)) {
      todayDataIdx = index;
      return el;
    }
  });

  console.log('todayData in finance', todayData)

  //set classes for the styles
  const classes = useStyles();

  //to dispatch thunk
  const dispatch = useDispatch();

  //set purchases array to empty for additions
  const [purchases, setPurchases] = useState([]);

  //set purchases array with current data or set it with one empty purchase object

  //below called with useEffect to set purchases on state
  const loadData = () => {
    if (todayDataIdx !== undefined) {
      //spread purchases from todayData and then spread the objects within it
      const purchaseSet = [...todayData[0].purchases.map(el => {return {...el}})]
      setPurchases(purchaseSet)
    } else {
      setPurchases([{ typeOfPurchase: "", cost: "" }])
    }
  }

  //change type selected for finance item
  const handleChangeType = (evt) => {
    const newPurchases = [...purchases];
    newPurchases[evt.target.name].typeOfPurchase = evt.target.value;
    setPurchases(newPurchases);
  };

  //change cost amount
  const handleChangeCost = (evt) => {
    const newPurchases = [...purchases];
    newPurchases[evt.target.name].cost = evt.target.value;
    setPurchases(newPurchases);
  };

  //add a row to the array of purchases set on state
  const handleAddRow = () => {
    setPurchases([...purchases, { typeOfPurchase: "", cost: "" }]);
  };

  const handleDeleteRow = (evt) => {
    const idx = evt.currentTarget.name
    let newPurchases = [...purchases]
    newPurchases.splice(idx, 1)
    setPurchases(newPurchases)
  };

  //submit the finances updates
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (purchases.length > 0) {
      const purchasesUpdated = purchases.filter((el) => el.typeOfPurchase !== "")
      let updatedFinancial
      if (todayDataIdx !== undefined) {
        //spread financial data here, but it's a shallow copy.
        updatedFinancial = [...user.financial];
        updatedFinancial[todayDataIdx].purchases = purchasesUpdated;
      } else {
        const financeObj = {
          date: props.date,
          purchases,
        };
        updatedFinancial = [...user.financial, financeObj];
      }
      dispatch(addFinanceData(user.username, updatedFinancial));
    } else if (todayDataIdx !== undefined) {
      let updatedFinancial = [...user.financial]
      updatedFinancial.splice(todayDataIdx, 1)
      dispatch(addFinanceData(user.username, updatedFinancial));
    }
  };

  useEffect(() => {
    loadData()
  }, [user])

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Finances
      </Typography>
      {todayDataIdx && (
        <Typography variant="body2" gutterBottom>
          Today's Purchases:{" "}
          {todayData[0].purchases.map((el) => (
            <p>
              {el.typeOfPurchase.toUpperCase()}: {el.cost}
            </p>
          ))}
        </Typography>
      )}
      <Grid container xs={12}>
      {purchases.map((el, index) => {
        return (
          <Fragment>
            <Grid item xs={5}>
            <FormControl
              name="cost"
              value={index}
              className={classes.inputItem}
            >
              <InputLabel htmlFor="cost">Cost</InputLabel>
              <Input id="cost" name={index} value={el.cost} onChange={handleChangeCost} />
            </FormControl>
            </Grid>
            <Grid item xs={5} >
            <FormControl className={classes.inputItem}>
              <InputLabel id="financeType">Type</InputLabel>
              <Select
                value={el.typeOfPurchase}
                name={index}
                onChange={handleChangeType}
                labelId="financeType"
              >
                {["prescription", "sanitary products", "doctor", "other"].map(
                  (el) => (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button name={index} onClick={handleDeleteRow}>x</Button>
            </Grid>
          </Fragment>
        );
      })}
      </Grid>
      <Button onClick={handleAddRow}>+</Button>
      <Button onClick={handleSubmit}>Update Finances</Button>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  inputItem: {
    width: "95%",
  },
});
