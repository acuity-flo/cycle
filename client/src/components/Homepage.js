import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export default function HomePage () {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <img src={require('../images/Logo_Update.svg')} className={classes.image} />
            <h1>HI IM THE HOMEPAGE</h1>
            <h1>To Login Press here: </h1> 
            <a href="/login">HEREEE</a>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    image: {
      marginTop: "5vh",
      width: "30vw",
      alignSelf: "center"
    },
    root: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      width: "40vw",
      alignItems: "center",
    },
    pronouns: {
      alignSelf: "flex-start",
    },
    inputItem: {
      margin: "0.5em",
      width: "20vw"
    },
    inputLabel: {
      width: "20vw"
    }
  }));