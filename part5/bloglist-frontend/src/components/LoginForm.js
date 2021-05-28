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
    <button id='login-button' type="submit">login</button>
  </form>

</>
export default LoginForm