import { Button } from '@material-ui/core'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setErrorMessage ,setTitle,setAuthor,setURL } from '../reducers/dataSlice'

const BlogForm = ({ addBlog }) => {
  const dispatch = useDispatch()
  const title = useSelector(state => state.data.title)
  const author = useSelector(state => state.data.author)
  const url = useSelector(state => state.data.url)

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await addBlog({ title,author,url })
      dispatch(setTitle(''))
      dispatch(setAuthor(''))
      dispatch(setURL(''))
      dispatch(setErrorMessage({ message:'Blog added',success:true }))
      setTimeout(() => {
        dispatch(setErrorMessage({ message:null,success:true }))
      }, 3000)
    }catch (exception) {
      dispatch(setErrorMessage({ message:'Blog add failed!',success:false }))
      setTimeout(() => {
        dispatch(setErrorMessage({ message:null,success:false }))
      }, 3000)
    }

  }

  return <>
    <h2>create new</h2>
    <div style={{ marginBottom: '0.5em' }}>
      <form onSubmit={handleCreate}>
        <div>title:
          <input id='title' type="text" value={title} name="Title" onChange={({ target }) => dispatch(setTitle(target.value))} />
        </div>
        <div>author:
          <input id='author' type="text" value={author} name="Author" onChange={({ target }) => dispatch(setAuthor(target.value))} />
        </div>
        <div>url:
          <input id='url' type="text" value={url} name="URL" onChange={({ target }) => dispatch(setURL(target.value))} />
        </div>
        <Button id='create-button' color="inherit" type="submit">create</Button>
      </form>
    </div>
  </>}
export default BlogForm