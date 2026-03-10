import React from 'react'
import FormGroup from '../components/FormGroup'
import "../style/register.scss"
import { Link } from 'react-router'
import { Login } from './Login'


const Register = () => {
  return (
   <main className="register-page">
  <div className="form-container">
    <h1>Register</h1>
    <form>
      <FormGroup label="Username" placeholder="Enter your name" type="text"/>
      <FormGroup label="Email" placeholder="Enter your email" type="email"/>
      <FormGroup label="Password" placeholder="Enter your password" type="password"/>

      <button type='submit'>Register</button>
    </form>
     <p>Already registered, then  <i><Link to="/login">Login</Link></i> </p> 
  </div>
</main>
  )
}

export default Register
