import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const Individual = () => {
  const blogsByUserId = useSelector(state => state.data.blogsByUserId)
  const usersById = useSelector(state => state.data.usersById)
  const useridInView=useParams().useridInView

  return usersById[useridInView] ? <>
    <h2>{usersById[useridInView].name}</h2>
    <h3>added blogs</h3>
    <ul>
      {blogsByUserId[useridInView].map(blog => <li key={blog.id}>{blog.title}</li>)}
    </ul>
  </>:null
}
export default Individual