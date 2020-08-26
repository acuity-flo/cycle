import React, { useState, Fragment } from 'react'
import { authUserThunk } from '../store'
import { connect } from 'react-redux'
import { Button, FormControl, FormLabel, Input, InputLabel, Select, MenuItem } from '@material-ui/core'
import { set } from 'mongoose'

const AuthForm = (props) => {
  const [type, setType] = useState('login')
  const [pronouns, setPronouns] = useState('')
  const { handleSubmit } = props

  const handleChange = (event) => {
    setPronouns(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit} name={type} >
      <FormControl name="email">
        <InputLabel htmlFor="email" >Enter Email </InputLabel>
        <Input id="email" />
      </FormControl>
      <FormControl name="password" >
        <InputLabel htmlFor="password">Enter Password </InputLabel>
        <Input id="password" type="password" />
      </FormControl>

      {type === 'signup' && <Fragment>
      <FormControl name="username">
        <InputLabel htmlFor="username">Enter Username </InputLabel>
        <Input id="username" />
      </FormControl>
      <FormControl name="fullName" >
        <InputLabel htmlFor="fullName" >Enter Name </InputLabel>
        <Input id="fullName" />
      </FormControl>
      <InputLabel id="pronouns">Pronouns</InputLabel>
      <Select labelId="pronouns" value={pronouns} name="pronouns" onChange={handleChange}>
        <MenuItem value="she/her/hers">she/her/hers</MenuItem>
        <MenuItem value="he/him/his">he/him/his</MenuItem>
        <MenuItem value="they/them/theirs">they/them/theirs</MenuItem>
      </Select>
      <FormLabel>If you know you average cycle length, enter it below. We will set your average cycle length to 28 days if not entered.</FormLabel>
      <FormControl name="cyclelength">
        <Input id="cyclelength" />
      </FormControl>
      </Fragment>}
      <Button variant="outline" color="primary" type="submit">Submit</Button>
      <Button variant="outline" color="primary" onClick={() => type === "login" ? setType('signup') : setType('login')}>{type === "login" ? "New User? Sign Up Now" : "Already a User? Login"}</Button>
    </form>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
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
      dispatch(authUserThunk(user, formName))
    }
  }
}

export const Auth = connect(null, mapDispatch)(AuthForm)
