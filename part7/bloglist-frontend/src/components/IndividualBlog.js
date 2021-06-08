import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import blogService from '../services/blogs'
import { refreshBlogs } from '../utils'
import { Button, TextField } from '@material-ui/core'

const IndividualBlog = () => {
  const [comment,setComment] = useState('')
  const dispatch = useDispatch()
  const blogidInView = useParams().blogidInView
  const blog = useSelector(state => state.data.blogs.find(blog => blog.id === blogidInView))

  const incrementLike = async (id,user,title,author,url,likes) => {
    await blogService.update(id,{
      user, title, author, url, likes:likes+1
    })
    refreshBlogs(dispatch)
  }

  const addComment = async (id,comment) => {
    await blogService.comment(id,{
      comment
    })
    setComment('')
    refreshBlogs(dispatch)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return <>{blog ? <div style={blogStyle} className='blogContent'>
    <h2>{blog.title} {blog.author}
    </h2>
    {/* See https://stackoverflow.com/questions/47447441/cant-open-new-tab-in-react-adds-localhost3000-on-link */}
    <div><a href={'//'+blog.url} target="_blank" rel="noreferrer">{blog.url}</a></div>
    <div className='likes'>likes {blog.likes} <button id='like-button' onClick={() => incrementLike(blog.id,blog.user.id,blog.title,blog.author,blog.url,blog.likes)}>like</button></div>
    <div>added by {blog.user.name}</div>
    <h2>comments</h2>
    <form noValidate autoComplete="off">
      <TextField label="" variant="outlined" onChange={(event) => setComment(event.target.value)} value={comment} />
      <Button onClick={() => {addComment(blog.id,comment)}}>Add Comment</Button>
    </form>
    <ul>
      {blog.comments.map((comment,idx) => <li key={idx}>{comment}</li>)}
    </ul>
  </div>:null}
  </>
}

export default IndividualBlog