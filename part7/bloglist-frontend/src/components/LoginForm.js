import { Button } from '@material-ui/core'
import React from 'react'

const LoginForm = ({ handleSubmit,username,password,handleUsernameChange,handlePasswordChange }) => <>
  <h2>log in to application</h2>
  <form onSubmit={handleSubmit}>
    <div>username
      <input id='username' type="text" value={username} name="Username" onChange={handleUsernameChange} />
    </div>
    <div>
        password
      <input id='password'
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <Button id='login-button' color="inherit" type="submit">login</Button>
  </form>

</>
export default LoginForm