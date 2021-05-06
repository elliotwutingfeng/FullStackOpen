const Blog = require('../models/blog')

const initialBlogs = [{
  title: 'a title', author: 'the author', url: 'www.google.com.sg', likes: 9000,
}, {
  title: 'b title', author: 'the author', url: 'www.google.com.sg', likes: 9000,
}]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb,
}
