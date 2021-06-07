import React, { useState } from 'react'
import blogService from '../services/blogs'
import { refreshBlogs } from '../utils'
import { setErrorMessage } from '../reducers/dataSlice'
import { useDispatch } from 'react-redux'
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const incrementLike = async (id,user,title,author,url,likes) => {
    await blogService.update(id,{
      user, title, author, url, likes:likes+1
    })
    refreshBlogs(dispatch)
  }
  const deleteBlog = async (id) => {
    try{
      await blogService.remove(id)
    }
    catch(exception){
      dispatch(setErrorMessage({ message:'Unauthorized user',success:false }))
      setTimeout(() => {
        dispatch(setErrorMessage({ message:null,success:true }))
      }, 3000)
    }
    refreshBlogs(dispatch)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails,setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const removeBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {await deleteBlog(blog.id)}
  }
  const details = () => <>
    <div>{blog.url}</div>
    <div className='likes'>likes {blog.likes} <button id='like-button' onClick={() => incrementLike(blog.id,blog.user.id,blog.title,blog.author,blog.url,blog.likes)}>like</button></div>
    <div>{blog.user.name}</div>
    <div><button id='remove-button' onClick={removeBlog}>remove</button></div>
  </>
  return <div style={blogStyle} className='blogContent'>
    <div>{blog.title} {blog.author}
      <button id='show-details-button' onClick={toggleShowDetails}>{showDetails ? 'hide':'view'}</button>
    </div>
    {showDetails && details()}
  </div>
}

export default Blog