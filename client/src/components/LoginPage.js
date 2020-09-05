import React from 'react'
import Auth from '../forms/Auth'
import { makeStyles } from '@material-ui/core/styles'

export default function LoginPage () {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <img src={require('../images/Logo_Update.svg')} className={classes.image} alt={"Cycle Logo"}/>
            <Auth />
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
      width: "30%",
      '@media(max-width: 1000px)': {
        width: '40%'
      },
      '@media(max-width: 800px)': {
        width: '50%'
      },
      '@media(max-width: 600px)': {
        width: '60%'
      },
      '@media(max-width: 400px)': {
        width: '70%'
      },
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
