import React, { useState } from 'react'
const Blog = ({ blog,updateBlog }) => {
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
  const details = () => <>
    <div>{blog.url}</div>
    <div>likes {blog.likes} <button onClick={incrementLike}>like</button></div>
    <div>{blog.user.name}</div>
  </>
  return <div style= {blogStyle}>
    <div>{blog.title} {blog.author}
      <button onClick={toggleShowDetails}>{showDetails ? 'hide':'view'}</button>
    </div>
    {showDetails && details()}
  </div>
}

export default Blog