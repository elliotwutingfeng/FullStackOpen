import React, { useState } from 'react'

const BlogForm = ({ addBlog,setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await addBlog(title,author,url)
      setTitle('')
      setAuthor('')
      setURL('')
      setErrorMessage({ message:'Blog added',success:true })
      setTimeout(() => {
        setErrorMessage({ message:null,success:true })
      }, 3000)
    }catch (exception) {
      setErrorMessage({ message:'Blog add failed!',success:false })
      setTimeout(() => {
        setErrorMessage({ message:null,success:false })
      }, 3000)
    }

  }

  return <>
    <h2>create new</h2>
    <div style={{ marginBottom: '0.5em' }}>
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
  </>}
export default BlogForm