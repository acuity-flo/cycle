import React, { useState, Fragment } from 'react'
import { authUserThunk } from './store'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const AuthForm = (props) => {
  // const [name, setName] = useState('')
  // const [username, setUsername] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [pronouns, setPronouns] = useState('')
  const [type, setType] = useState('login')
  const { handleSubmit } = props

  return (
    <Form onSubmit={handleSubmit} name={type} >
      <Form.Control type="email" placeholder="Enter email" name="email" />
      <Form.Control type="password" placeholder="Enter password" name="password" />
      {type === 'signup' && <Fragment>
        <Form.Control type="text" placeholder="Enter username" name="username" />
        <Form.Control type="text" placeholder="Enter Full Name" name="fullName" />
        <Form.Control as="select" name="pronouns">
          <option>she/her/hers</option>
          <option>he/him/his</option>
          <option>they/them/theirs</option>
        </Form.Control>
      </Fragment>}
      <Button type="submit">Submit</Button>
      <Button onClick={() => type === "login" ? setType('signup') : setType('login')}>{type === "login" ? "New User? Sign Up Now" : "Already a User? Login"}</Button>
    </Form>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault()
      console.log('event.target.name in mapD', event.target.name)
      const formName = event.target.name
      const user = {
        email: event.target.email.value,
        password: event.target.password.value
      }
      if (formName === 'signup') {
        user.username = event.target.username.value
        user.name = event.target.fullName.value
        user.pronouns = event.target.pronouns.value
      }
      dispatch(authUserThunk(user, formName))
    }
  }
}

export const Auth = connect(null, mapDispatch)(AuthForm)
