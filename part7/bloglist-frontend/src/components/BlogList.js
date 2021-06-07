import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, setErrorMessage } from '../reducers/dataSlice'


const BlogList = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.data.blogs)

  const refreshBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes-a.likes)
    dispatch(setBlogs(blogs))
  }

  const addBlog = async ({ title,author,url }) => {
    await blogService.create({
      title, author, url,
    })
    blogFormRef.current.toggleVisibility()
    refreshBlogs()
  }
  const incrementLike = async (id,user,title,author,url,likes) => {
    await blogService.update(id,{
      user, title, author, url, likes:likes+1
    })
    refreshBlogs()
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
    refreshBlogs()
  }

  return <>
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} incrementLike={incrementLike} deleteBlog={deleteBlog} />
    )}</>
}
export default BlogList