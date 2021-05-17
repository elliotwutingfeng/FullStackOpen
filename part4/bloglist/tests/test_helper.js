const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
  title: 'a title', author: 'the author', url: 'www.google.com.sg', likes: 9000,
}, {
  title: 'b title', author: 'the author', url: 'www.google.com.sg', likes: 9000,
}]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
