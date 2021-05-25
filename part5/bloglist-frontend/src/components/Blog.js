import React, { useState } from 'react'
const Blog = ({ blog,updateBlog, deleteBlog }) => {
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

  const incrementLike = async () => {await updateBlog(blog.id,blog.user.id,blog.title,blog.author,blog.url,blog.likes+1)}
  const removeBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {await deleteBlog(blog.id)}
  }
  const details = () => <>
    <div>{blog.url}</div>
    <div>likes {blog.likes} <button onClick={incrementLike}>like</button></div>
    <div>{blog.user.name}</div>
    <div><button onClick={removeBlog}>remove</button></div>
  </>
  return <div style= {blogStyle}>
    <div>{blog.title} {blog.author}
      <button onClick={toggleShowDetails}>{showDetails ? 'hide':'view'}</button>
    </div>
    {showDetails && details()}
  </div>
}

export default Blog