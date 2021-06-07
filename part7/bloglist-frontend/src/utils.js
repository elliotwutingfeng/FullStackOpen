import blogService from './services/blogs'
import { setBlogs } from './reducers/dataSlice'
export const refreshBlogs = async (dispatch) => {
  const blogs = await blogService.getAll()
  blogs.sort((a,b) => b.likes-a.likes)
  dispatch(setBlogs(blogs))
}