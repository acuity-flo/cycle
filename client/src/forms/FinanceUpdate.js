import React, { useState } from 'react'
import { Button, FormControl, MenuItem, Input, InputLabel, Select, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { addFinanceData } from '../store'

export default function FinanceUpdate (props) {
    const user = props.user
    const todayData = user.financial.filter(el => moment(el.date).isSame(props.date))
    const classes = useStyles()
    const dispatch = useDispatch()
    const [purchases, setPurchases] = useState([{typeOfPurchase: '', cost: ''}])
    // if (todayData[0]) {
    //     setPurchases(todayData)
    // }
    const handleChangeType = (evt) => {
        const newPurchases = [...purchases]
        newPurchases[evt.target.name].typeOfPurchase = evt.target.value
        setPurchases(newPurchases)
    }
    const handleChangeCost = (evt) => {
        const newPurchases = [...purchases]
        newPurchases[evt.target.name].cost = evt.target.value
        setPurchases(newPurchases)
    }
    const handleAddRow = () => {
        setPurchases([...purchases, {typeOfPurchase: '', cost: ''}])
    }
    const handleSubmit = (evt) => {
        if(purchases.length && purchases.every(el => el.typeOfPurchase !== '')) {
            const financeObj = {
                date: props.date,
                purchases
            }
            const updatedPurchases = [...user.financial, financeObj]
            dispatch(addFinanceData(user.username, updatedPurchases))
        }
    }
    return (
        <div className={classes.root}>
            <Typography id="discrete-slider-restrict" gutterBottom>
            Finances
            </Typography>
            {todayData[0] && <Typography variant="body2" gutterBottom>
            Today's Purchases: {todayData[0].purchases.map(el => <p>{el.typeOfPurchase.toUpperCase()}: {el.cost}</p>)}
            </Typography>}
            {purchases.map((el, index) =>{
            return (
            <div key={index}>
                <FormControl name="cost" value={index} className={classes.inputItem}>
                    <InputLabel htmlFor="cost">Cost</InputLabel>
                    <Input id="cost" name={index} onChange={handleChangeCost}/>
                </FormControl>
                <FormControl className={classes.inputItem}>
                    <InputLabel id="financeType">Type</InputLabel>
                    <Select value={purchases[index].typeOfPurchase} name={index} onChange={handleChangeType} labelId="financeType" >
                        {['prescription', 'sanitary products', 'doctor', 'other'].map(el => (
                            <MenuItem key={el} value={el}>{el}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>)})}
            <Button onClick={handleAddRow}>+</Button>
            <Button onClick={handleSubmit}>Update Finances</Button>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    inputItem: {
        width: "50%"
    }
  });
