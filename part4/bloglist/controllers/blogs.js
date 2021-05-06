const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
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
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  }
})

module.exports = blogsRouter
