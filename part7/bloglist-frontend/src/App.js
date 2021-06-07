import React, { useEffect,useRef } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword ,setUser,setBlogs,setErrorMessage } from './reducers/dataSlice'
import BlogList from './components/BlogList'
import MainHeader from './components/MainHeader'

const App = () => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.data.username)
  const password = useSelector(state => state.data.password)
  const user = useSelector(state => state.data.user)
  const errorMessage = useSelector(state => state.data.errorMessage)

  const blogFormRef = useRef()

  const refreshBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes-a.likes)
    dispatch(setBlogs(blogs))
  }

  useEffect(async () => {
    // Set Token and Fetch blogs only when user credentials are set
    if(user !== null){
      blogService.setToken(user.token)
      refreshBlogs()
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
    <>
      {errorMessage.message !== null ? <font className="error" color={errorMessage.success ?'green':'red'}>{errorMessage.message}</font>: null}
      { user === null ? <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => dispatch(setUsername(target.value))}
        handlePasswordChange={({ target }) => dispatch(setPassword(target.value))}
        handleSubmit={handleLogin}
      />:<><MainHeader handleLogout={handleLogout} user={user} /><BlogList blogFormRef={blogFormRef} /></>}
    </>
  )
}

export default App