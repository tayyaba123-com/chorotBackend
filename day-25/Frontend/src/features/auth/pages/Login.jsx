import React from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'

export const Login = () => {
  return (
<main className="login-page">
  <div className="form-container">
    <h1>Login</h1>
    <form>
      <FormGroup label="Email" placeholder="Enter your email" type="email"/>

      <FormGroup label="Password" placeholder="Enter your password" type="password"/>

      <button type='submit'>Login</button>
    </form>
    <p></p>
  </div>
</main>
 )
}
