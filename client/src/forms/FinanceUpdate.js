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
          return { ...el };
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
    console.log('in Finance update - Cost update', newPurchases);
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
    console.log('in Finance update - delete', newPurchases);
    setPurchases(newPurchases);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Finances
      </Typography>
      {todayData && todayData.length && (
        <Typography variant="body2" gutterBottom>
          Today's Purchases:{' '}
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
                  <Input
                    id="cost"
                    name={index}
                    value={el.cost}
                    onChange={handleChangeCost}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={5}>
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
              <Grid item xs={2}>
                <Button name={index} onClick={handleDeleteRow}>
                  x
                </Button>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
      <Button onClick={handleAddRow}>+</Button>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputItem: {
    width: '95%',
  },
});
