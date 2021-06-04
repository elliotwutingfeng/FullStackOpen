const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body, user } = request

  // If 'likes' property is missing, set it to 0
  if (!Object.prototype.hasOwnProperty.call(body, 'likes')) {
    body.likes = 0
  }

  // If either 'title' or 'url' properties are missing, respond with 400 Bad Request
  if (!Object.prototype.hasOwnProperty.call(body, 'title')
  || !Object.prototype.hasOwnProperty.call(body, 'url')) {
    response.status(400).end()
  } else {
    const blog = new Blog(request.body)
    blog.user = user._id
    await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(blog)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user, params } = request

  // Check if blog belongs to current user
  const blog = await Blog.findById(params.id)
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(params.id)
    return response.status(204).end()
  }

  return response.status(403).json({ error: 'unauthorized user' })
})

blogsRouter.put('/:id', async (request, response) => {
  // If 'likes' property is missing, set it to 0
  const { body } = request
  if (!Object.prototype.hasOwnProperty.call(body, 'likes')) {
    body.likes = 0
  }

  // If either 'title' or 'url' properties are missing, respond with 400 Bad Request
  if (!Object.prototype.hasOwnProperty.call(body, 'title')
    || !Object.prototype.hasOwnProperty.call(body, 'url')) {
    response.status(400).end()
  } else {
    await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    response.status(204).end()
  }
})

module.exports = blogsRouter
