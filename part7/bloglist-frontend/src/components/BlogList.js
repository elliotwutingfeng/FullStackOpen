import React from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { refreshBlogs } from '../utils'

import {
  Link,
} from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'

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

  return <>
    <h2>blog app</h2>
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>

    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={'/blogs/'+blog.id}>{blog.title} {blog.author}</Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}
export default BlogList