import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState({ message:null,success:false })

  const blogFormRef = useRef()

  useEffect(() => {
    // Set Token and Fetch blogs only when user credentials are set
    if(user !== null){
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )}
  }, [user])

  useEffect(() => {
    // On first page load, set user credentials from local storage if any
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      // Set user credentials
      setUser(user)
      setErrorMessage({ message:'Logged in',success:true })
      setTimeout(() => {
        setErrorMessage({ message:null,success:true })
      }, 3000)
    } catch (exception) {
      setErrorMessage({ message:'Wrong credentials',success:false })
      setTimeout(() => {
        setErrorMessage({ message:null,success:false })
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser') // Clear user credentials from local storage
    setUser(null) // Unset user credentials
    blogService.setToken(null) // Unset token
    setErrorMessage({ message:'Logged out',success:true })
    setTimeout(() => {
      setErrorMessage({ message:null,success:true })
    }, 3000)
  }

  const addBlog = async (title,author,url) => {
    await blogService.create({
      title, author, url,
    })
    const blogs = await blogService.getAll()
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs)
  }
  const blogList = () => <>
    <h2>blogs</h2>
    <div style={{ marginBottom: '0.5em' }}>
      <form onSubmit={handleLogout}>{user.name} logged in<button type="submit">logout</button></form>
    </div>
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} setErrorMessage={setErrorMessage} />
    </Togglable>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}</>

  return (
    <>
      {errorMessage.message !== null ? <font color={errorMessage.success ?'green':'red'}>{errorMessage.message}</font>: null}
      { user === null ? <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />:blogList()}
    </>
  )
}

export default App