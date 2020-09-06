import React from 'react'
import Fade from 'react-reveal/Fade'
import { makeStyles, Button, Typography,Container } from '@material-ui/core/'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {Redirect} from 'react-router-dom'
import { useState } from 'react'



export default function Home () {
    const [isClicked, setClicked] = useState(false)
    const classes = useStyles()

    const handleClick = () => {
      setClicked(true)
    }

    return (
        <div className={classes.container}>
           
            <Fade delay={100}><img src={require('../images/Logo_Update.svg')} className={classes.image} alt={"Cycle Logo"}/></Fade>
              <div classes={classes.fadeHome}>
                <Typography align='center' > 
                    <Typography variant='h4'><Fade  delay={300} > Introducing Cycle: </Fade> </Typography>
                      <div className = {classes.fadeItem} >
                        <Fade  delay={700} > <FiberManualRecordIcon style={{ fill: '#DEB88F'}}/>Menstruation Tracking </Fade>
                        <Fade  delay={1100}>  <FiberManualRecordIcon style={{ fill: '#8FB5DE'}}/> Symptom Tracking </Fade> 
                        <Fade  delay={1500}> <FiberManualRecordIcon style={{ fill: '#9BB47A'}}/> Finance Tracking </Fade> 
                      </div>
                  <br/>
                  <br/>   
                  <Fade delay={1900} >*****MISSION STATEMENT GOES HERE******</Fade>
                </Typography>
              </div> 

            <br/>  
              <Fade delay={1900}><Button onClick={handleClick} variant="outlined" color="primary" type="submit">Get Started</Button></Fade>
              {isClicked ? (<Redirect from ="/" to="/login" />) : null}

        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
    },
    button: {
      margin: "0.5em",
      backgroundColor: "white",
      color: "#545454"
    }, 
    fadeHome:{
      display: 'flex',
      justifyContent: "space-between",
    },
    fadeItem:{
      display:'flex'
    }

  }));
