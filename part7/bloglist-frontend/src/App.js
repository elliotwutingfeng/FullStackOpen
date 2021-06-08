import React, { useEffect,useRef } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword ,setUser,setErrorMessage } from './reducers/dataSlice'
import BlogList from './components/BlogList'
import Navbar from './components/Navbar'

import Users from './components/Users'

import {
  BrowserRouter as Router,
  Redirect,
  Route, Switch,
} from 'react-router-dom'
import IndividualUser from './components/IndividualUser'
import IndividualBlog from './components/IndividualBlog'

import { refreshBlogs } from './utils'

import Container from '@material-ui/core/Container'

const App = () => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.data.username)
  const password = useSelector(state => state.data.password)
  const user = useSelector(state => state.data.user)
  const errorMessage = useSelector(state => state.data.errorMessage)

  const blogFormRef = useRef()

  useEffect(async () => {
    // Set Token and Fetch blogs only when user credentials are set
    if(user !== null){
      blogService.setToken(user.token)
      refreshBlogs(dispatch)
    }
  }, [user])

  useEffect(() => {
    // On first page load, set user credentials from local storage if any
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))

    }  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      dispatch(setUsername(''))
      dispatch(setPassword(''))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      // Set user credentials
      dispatch(setUser(user))
      dispatch(setErrorMessage({ message:'Logged in',success:true }))
      setTimeout(() => {
        dispatch(setErrorMessage({ message:null,success:true }))
      }, 3000)
    } catch (exception) {
      dispatch(setErrorMessage({ message:'Wrong credentials',success:false }))
      setTimeout(() => {
        dispatch(setErrorMessage({ message:null,success:false }))
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser') // Clear user credentials from local storage
    dispatch(setUser(null)) // Unset user credentials
    blogService.setToken(null) // Unset token
    dispatch(setErrorMessage({ message:'Logged out',success:true }))
    setTimeout(() => {
      dispatch(setErrorMessage({ message:null,success:true }))
    }, 3000)
  }



  return (
    <Container>
      <Router>
        {errorMessage.message !== null ? <font className="error" color={errorMessage.success ?'green':'red'}>{errorMessage.message}</font>: null}
        <Navbar handleLogout={handleLogout} user={user} />
        <Switch>
          <Route path='/login'>{user ? <Redirect to="/" /> :
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => dispatch(setUsername(target.value))}
              handlePasswordChange={({ target }) => dispatch(setPassword(target.value))}
              handleSubmit={handleLogin}
            />}
          </Route>
          <Route path='/blogs/:blogidInView'>
            {user ?  <IndividualBlog />: <Redirect to="/login" />}
          </Route>
          <Route path='/users/:useridInView'>
            {user ?  <IndividualUser />: <Redirect to="/login" />}
          </Route>
          <Route path='/users'>
            {user ?  <Users />: <Redirect to="/login" />}
          </Route>
          <Route path='/'>
            {user ?  <BlogList blogFormRef={blogFormRef} />: <Redirect to="/login" />}
          </Route>
        </Switch>

      </Router></Container>
  )
}

export default App