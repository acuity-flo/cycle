import React from 'react'
import { ReactComponent as LogoSVG }  from '../images/Logo2.svg'
import { withRouter } from 'react-router';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


function SimpleMobileTop (props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className = {classes.nav}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick = {()=> {
              props.history.push('/')
            }}
          >
          <Typography variant="title">
            <LogoSVG height={50} width={50}/>
          </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(SimpleMobileTop)

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
})
