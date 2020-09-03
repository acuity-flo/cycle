import React from 'react'
import { makeStyles, Button } from '@material-ui/core/'

export default function HomePage () {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <img src={require('../images/Logo_Update.svg')} className={classes.image} />

            <h1>Symptoms? Menstruation? Finances?</h1> 
            <h1>Welcome to Cycle.</h1>
            <p>The cyclical tracking app for female-identifying, non-binary, and trans people aimed to record their monthly symptoms, menstruation, and/or related finances.</p>
            <p>What makes Cycle different from the other tracking apps out there?</p>
            <a href="/login">HEREEE</a>
            <Button className={classes.button}>Get Started!</Button>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    button: {
      margin: "0.5em",
      backgroundColor: "white",
      color: "#545454"
    }
  }));