import React from 'react'
import Auth from '../forms/Auth'
import { makeStyles } from '@material-ui/core/styles'

export default function ErrorComp () {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <img src={require('../images/404.svg')} className={classes.image} />
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
      width: "50vw",
      alignSelf: "center"
    },
  }));
