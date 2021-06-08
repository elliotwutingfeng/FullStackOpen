import React from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { refreshBlogs } from '../utils'

import {
  Link,
} from 'react-router-dom'

const BlogList = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.data.blogs)

  const addBlog = async ({ title,author,url }) => {
    await blogService.create({
      title, author, url,
    })
    blogFormRef.current.toggleVisibility()
    refreshBlogs(dispatch)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return <>
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>

    {blogs.map(blog =>

      <div key={blog.id} style={blogStyle}>
        <Link to={'/blogs/'+blog.id}>{blog.title} {blog.author}</Link>
      </div>

    )}
  </>
}
export default BlogList