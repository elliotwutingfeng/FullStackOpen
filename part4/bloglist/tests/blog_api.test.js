/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('4.8 blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('4.8 correct amount of blog posts', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('4.9 unique identifier property of the blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')

  response.body.map((r) => expect(r.id).toBeDefined())
})

test('4.10 making an HTTP POST request successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'c title', author: 'the author', url: 'www.google.com.sg', likes: 9000,
  }
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  const response = await api
    .get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  const contents = response.body.map(({ id, ...r }) => r)
  expect(contents).toContainEqual(newBlog)
})

test('4.11 POST request without likes property will default likes property to the value 0',
  async () => {
    const newBlog = {
      title: 'c title', author: 'the author', url: 'www.google.com.sg',
    }
    const res = await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBe(0)
  })

test('4.12 If either title or url properties are missing, respond with 400 Bad Request',
  async () => {
    const noTitle = {
      author: 'the author', url: 'www.google.com.sg', likes: 9000,
    }
    const noURL = {
      title: 'c title', author: 'the author', likes: 9000,
    }
    const noTitleAndNoURL = {
      author: 'the author', likes: 9000,
    }
    for (const newBlog of [noTitle, noURL, noTitleAndNoURL]) {
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
    }
  })

afterAll(() => {
  mongoose.connection.close()
})
