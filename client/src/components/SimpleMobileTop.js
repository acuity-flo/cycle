import React from 'react'
import { ReactComponent as LogoSVG }  from '../images/Logo2.svg'
import { makeStyles } from '@material-ui/core/styles';


export default function SimpleMobileTop () {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <LogoSVG height={30} width={30}/>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    backgroundColor: '#545454',
    width: '100%',
    padding: '1em'
  }
}))
