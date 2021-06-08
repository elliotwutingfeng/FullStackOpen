import React from 'react'

const MainHeader = ({ handleLogout,user }) => {
  return <>
    <h2>blogs</h2>
    <div style={{ marginBottom: '0.5em' }}>
      <form onSubmit={handleLogout}>{user.name} logged in<button id='logout-button' type="submit">logout</button></form>
    </div>
  </>}
export default MainHeader