import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const blogsByUserId = useSelector(state => state.data.blogsByUserId)
  const usersById = useSelector(state => state.data.usersById)
  const authorsAndBlogCounts = Object.keys(blogsByUserId).map(userid => [usersById[userid].name,blogsByUserId[userid].length])
  return <>
    <h2>Users</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {authorsAndBlogCounts.map((x,id) => <Fragment key={id}>
          <tr><td>{x[0]}</td><td>{x[1]}</td></tr>
        </Fragment>)}
      </tbody></table>
  </>
}
export default Users