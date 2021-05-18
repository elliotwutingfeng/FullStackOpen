/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  // Create one user
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({
    username: 'root', name: 'The Root User', passwordHash, blogs: [],
  })
  // Create 2 blogs
  await Blog.deleteMany({})
  const { initialBlogs } = helper
  // Match user to blog
  initialBlogs.forEach((blog) => { blog.user = user._id })
  await Blog.insertMany(initialBlogs)

  // Match blogs to user
  const blogs = await helper.blogsInDb()

  blogs.forEach(async (blog) => {
    user.blogs = user.blogs.concat(blog.id)
  })

  await user.save()
})
describe('GET', () => {
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
})
describe('POST', () => {
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
})
describe('DELETE', () => {
  test('4.13 making an HTTP DELETE request successfully deletes the correct blog post', async () => {
    // Delete first item and check that it has been deleted successfully
    const beforeDeletionResponse = await api
      .get('/api/blogs')
    const idToDelete = beforeDeletionResponse.body[0].id
    await api.delete(`/api/blogs/${idToDelete}`).expect(204)
    const afterDeletionResponse = await api
      .get('/api/blogs')
    expect(afterDeletionResponse.body).toHaveLength(helper.initialBlogs.length - 1)
    const remainingIds = afterDeletionResponse.body.map((r) => r.id)
    expect(remainingIds).not.toContainEqual(idToDelete)
  })
})
describe('PUT', () => {
  test('4.14 making an HTTP PUT request successfully updates the correct blog post', async () => {
    // Update first item and check that it has been updated successfully
    const newBlog = {
      title: 'c title', author: 'the author', url: 'www.google.com.sg', likes: 2401,
    }
    const beforeUpdateResponse = await api
      .get('/api/blogs')
    const idToUpdate = beforeUpdateResponse.body[0].id
    await api.put(`/api/blogs/${idToUpdate}`).send(newBlog).expect(204)
    const afterUpdateResponse = await api
      .get('/api/blogs')
    expect(afterUpdateResponse.body).toHaveLength(helper.initialBlogs.length)
    const updatedContents = afterUpdateResponse.body
      .filter((r) => r.id === idToUpdate)
      .map(({ id, ...r }) => r)
    expect(updatedContents).toContainEqual(newBlog)
  })
})
// User API
describe('Adding users when there is initially one user in db', () => {
  test('4.15 creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('4.16 creation fails with proper statuscode and message if username is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'ab',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3).')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('4.16 creation fails with proper statuscode and message if password is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'abc',
      name: 'Matti Luukkainen',
      password: 'ab',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('4.16 creation fails with proper statuscode and message if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
