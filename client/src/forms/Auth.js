import React, { useState, Fragment } from 'react'
import { authUserThunk } from '../store'
import { useDispatch } from 'react-redux'
import { Button, FormControl, FormLabel, Input, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { set } from 'mongoose'
import {withRouter} from 'react-router'

const AuthForm = (props) => {
  const [type, setType] = useState('login')
  const [pronouns, setPronouns] = useState('')
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setPronouns(event.target.value)
  }

      const handleSubmit = async (event) => {
      event.preventDefault()
      const formName = event.target.name
      const user = {
        email: event.target.email.value,
        password: event.target.password.value
      }
      if (formName === 'signup') {
        user.username = event.target.username.value
        user.name = event.target.fullName.value
        user.pronouns = event.target.pronouns.value
        user.avgLengthOfCycle = event.target.cyclelength.value
      }
      // const reply = await dispatch(authUserThunk(user, formName))
      // console.log('REPLY',reply)
      dispatch(authUserThunk(user, formName))
      props.history.push('/me')
    }


  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} name={type} className={classes.root}>
      <FormControl name="email" className={classes.inputItem}>
        <InputLabel htmlFor="email" >Enter Email </InputLabel>
        <Input id="email" />
      </FormControl>
      <FormControl name="password" className={classes.inputItem}>
        <InputLabel htmlFor="password">Enter Password </InputLabel>
        <Input id="password" type="password" />
      </FormControl>

      {type === 'signup' && <Fragment>
      <FormControl name="username" className={classes.inputItem}>
        <InputLabel htmlFor="username">Enter Username </InputLabel>
        <Input id="username" />
      </FormControl>
      <FormControl name="fullName" className={classes.inputItem}>
        <InputLabel htmlFor="fullName" >Enter Name </InputLabel>
        <Input id="fullName" />
      </FormControl>
      <FormControl name="pronouns" className={classes.inputItem}>
      <InputLabel id="pronouns">Pronouns</InputLabel>
      <Select labelId="pronouns" value={pronouns} name="pronouns" onChange={handleChange} >
        <MenuItem value="she/her/hers">she/her/hers</MenuItem>
        <MenuItem value="he/him/his">he/him/his</MenuItem>
        <MenuItem value="they/them/theirs">they/them/theirs</MenuItem>
      </Select>
      </FormControl>
      <FormControl name="cyclelength" className={classes.inputItem}>
        <InputLabel id="cyclelength">Enter Cycle Length</InputLabel>
        <Input id="cyclelength" />
      </FormControl>
      <FormLabel className={classes.inputLabel}>If you know you average cycle length, enter it above. We will set your average cycle length to 28 days if not entered.</FormLabel>
      </Fragment>}
      <Button variant="outline" color="primary" type="submit" className={classes.button}>Submit</Button>
      <Button variant="outline" color="primary" onClick={() => type === "login" ? setType('signup') : setType('login')} className={classes.button}>{type === "login" ? "New User? Sign Up Now" : "Already a User? Login"}</Button>
    </form>
    </div>

  )
}

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(event) {
//       event.preventDefault()
//       const formName = event.target.name
//       const user = {
//         email: event.target.email.value,
//         password: event.target.password.value
//       }
//       if (formName === 'signup') {
//         user.username = event.target.username.value
//         user.name = event.target.fullName.value
//         user.pronouns = event.target.pronouns.value
//         user.avgLengthOfCycle = event.target.cyclelength.value
//       }
//       dispatch(authUserThunk(user, formName))
//     }
//   }
// }

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justify: "center",
    paddingBottom: "5em"
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
  },
  button: {
    margin: "0.5em"
  }
}));


export default withRouter(AuthForm)
