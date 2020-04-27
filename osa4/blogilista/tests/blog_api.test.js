const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Pasi Viheraho',
    url: 'https://www.lahdenkeskusvankila.fi',
    likes: 100,
  },
  {
    title: 'Second blog',
    author: 'Niilo Twenttituu',
    url: 'https://www.menetoihin.fi',
    likes: 22,
  },
  {
    title: 'Third blog',
    author: 'Pottatukka Repairs',
    url: 'https://www.tulinuskoon.fi',
    likes: 666,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  initialBlogs.forEach(async (blog) => {
    const blogObject = new Blog(blog)
    await blogObject.save(blogObject)
  })
})

test('GET /api/blogs returns right amount of data', async () => {
  const response = await api.get('/api/blogs')

  expect(response.status).toBe(200)
  expect(response.type).toBe('application/json')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
