import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function Footer() {
   const classes = useStyles();
  return (
    <div className = {classes.footer}>
      <br/>  
      <hr/>
      Im the feetsie of the page
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
    footer: {
      paddingTop: "75px"
    }
  }));
