import React from 'react'
import { useSelector } from 'react-redux'

const Individual = () => {
  const blogsByUserId = useSelector(state => state.data.blogsByUserId)
  const usersById = useSelector(state => state.data.usersById)
  const currentUserId = useSelector(state => state.data.currentUserId)

  return usersById[currentUserId] ? <>
    <h2>{usersById[currentUserId].name}</h2>
    <h3>added blogs</h3>
    <ul>
      {blogsByUserId[currentUserId].map(blog => <li key={blog.id}>{blog.title}</li>)}
    </ul>
  </>:null
}
export default Individual