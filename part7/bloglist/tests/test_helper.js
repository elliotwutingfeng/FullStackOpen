const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
  title: 'a title', author: 'The Root User', url: 'www.google.com.sg', likes: 9000, comments: ['this is a comment', 'this is another comment'],
}, {
  title: 'b title', author: 'The Root User', url: 'www.google.com.sg', likes: 9000, comments: ['this is a comment', 'this is another comment'],
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
