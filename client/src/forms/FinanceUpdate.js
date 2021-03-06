import React, { useEffect, Fragment } from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  Input,
  InputLabel,
  Select,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { UTIL_COST } from '../utilFcn';

export default function FinanceUpdate(props) {
  //user and finance data for day opened by the calendar, if anything for that date
  const { user, date, purchases, setPurchases, setFinanceIdx } = props;

  const todayData = user.financial.filter((el, index) => {
    const newDate = el.date.slice(0, 10);
    if (moment(newDate).isSame(date)) {
      setFinanceIdx(index);
      return el;
    }
  });

  //set classes for the styles
  const classes = useStyles();

  //below called with useEffect to set purchases on state
  const loadData = () => {
    if (todayData && todayData.length) {
      //spread purchases from todayData and then spread the objects within it
      const purchaseSet = [
        ...todayData[0].purchases.map((el) => {
          return { ...el, cost: UTIL_COST(el.cost) };
        }),
      ];
      setPurchases(purchaseSet);
    } else {
      setPurchases([{ typeOfPurchase: '', cost: '' }]);
    }
  };

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
    setPurchases([...purchases, { typeOfPurchase: '', cost: '' }]);
  };

  const handleDeleteRow = (evt) => {
    const idx = evt.currentTarget.name;
    let newPurchases = [...purchases];
    newPurchases.splice(idx, 1);
    setPurchases(newPurchases);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <div className={classes.root}>
      <Typography variant="body1" style={{ color: '#9BB47A' }} gutterBottom>
        FINANCES
      </Typography>
      <Grid container xs={12} justify="center">
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
                  <Input
                    id="cost"
                    name={index}
                    value={el.cost}
                    onChange={handleChangeCost}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.inputItem}>
                  <InputLabel id="financeType">Type</InputLabel>
                  <Select
                    value={el.typeOfPurchase}
                    name={index}
                    onChange={handleChangeType}
                    labelId="financeType"
                  >
                    {[
                      'prescription',
                      'sanitary products',
                      'doctor',
                      'other',
                    ].map((el) => (
                      <MenuItem key={el} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <Button
                  name={index}
                  onClick={handleDeleteRow}
                  className={classes.deleteButton}
                >
                  x
                </Button>
              </Grid>
            </Fragment>
          );
        })}
        <Button xs={6} onClick={handleAddRow}>
          +
        </Button>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  inputItem: {
    width: '95%',
  },
  deleteButton: {
    padding: '2px, 3px',
    fontSize: '10px',
    height: '100%',
    width: '100%',
  },
});
