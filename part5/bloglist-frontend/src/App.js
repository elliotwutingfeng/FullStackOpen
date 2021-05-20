import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState({message:null,success:false})

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
      setErrorMessage({message:'Logged in',success:true})
      setTimeout(() => {
        setErrorMessage({message:null,success:true})
      }, 3000)
    } catch (exception) {
      setErrorMessage({message:'Wrong credentials',success:false})
      setTimeout(() => {
        setErrorMessage({message:null,success:false})
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser') // Clear user credentials from local storage
    setUser(null) // Unset user credentials
    blogService.setToken(null) // Unset token
    setErrorMessage({message:'Logged out',success:true})
    setTimeout(() => {
      setErrorMessage({message:null,success:true})
    }, 3000)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title, author, url,
      })
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setTitle('')
      setAuthor('')
      setURL('')
      setErrorMessage({message:'Blog added',success:true})
      setTimeout(() => {
        setErrorMessage({message:null,success:true})
      }, 3000)
    }catch (exception) {
      setErrorMessage({message:'Blog add failed!',success:false})
      setTimeout(() => {
        setErrorMessage({message:null,success:false})
      }, 3000)
    }

  }

  const loginForm = () => <>
        <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
            </form>
      
  </>

  const createForm = () => <>
    <h2>create new</h2>
  <div style={{marginBottom: '0.5em'}}>
  <form onSubmit={handleCreate}>
        <div>title:
          <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
          </div>
          <div>author:
          <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
          </div>
          <div>url:
          <input type="text" value={url} name="URL" onChange={({ target }) => setURL(target.value)} />
          </div>
            <button type="submit">create</button>
            </form>
  </div>
  </>
  
  const blogList = () => <>
  <h2>blogs</h2>
  <div style={{marginBottom: '0.5em'}}>
    <form onSubmit={handleLogout}>{user.name} logged in<button type="submit">logout</button></form>
  </div>
    {createForm()}
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}</>

  return (
    <>
    {errorMessage.message !== null ? <font color={errorMessage.success ?"green":"red"}>{errorMessage.message}</font>: null}
{ user === null ? loginForm():blogList()}
    </>
  )
}

export default App