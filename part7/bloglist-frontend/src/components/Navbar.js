import { AppBar, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ handleLogout,user }) => {

  return <AppBar position="static">
    <Toolbar>
      <Button color="inherit" component={Link} to="/">
      blogs
      </Button>
      <Button color="inherit" component={Link} to="/users">
      users
      </Button>
      {user
         && <em>{user.name} logged in</em>
      }
      {user && <form onSubmit={handleLogout}><Button id='logout-button' type="submit">logout</Button></form>}
    </Toolbar>
  </AppBar>
}
export default Navbar