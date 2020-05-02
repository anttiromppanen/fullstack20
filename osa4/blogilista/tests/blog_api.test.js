const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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

describe('GET', () => {
  test('GET /api/blogs returns right amount of data', async () => {
    const response = await api.get('/api/blogs')

    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('GET object returns id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST', () => {
  test('New blog can be added to database', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'https://abcdefghijklmn.com',
      likes: 25,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map((x) => x.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('New Blog')
  })

  test('Make sure votes is set to 0, if votes === null', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'https://abcdefghijklmn.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body.find((x) => x.title === 'New Blog')

    expect(addedBlog.likes).toBeDefined()
  })

  test('Return 400 Bad request, if "title" and "url" are null', async () => {
    const newBlog = {
      author: 'New Author',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('DELETE', () => {
  test('Deletion of a blog works correctly', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1)
  })
})

describe('PUT', () => {
  test('Update of blog works correctly', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToUpdate = blogs.body[0]

    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 100,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`, newBlog)
      .expect(200)

    const updatedBlogs = await Blog.find({ title: newBlog.title })
    expect(updatedBlogs[0].likes).toBe(newBlog.likes)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sanasala', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    let usersAtStart = await User.find({})
    usersAtStart = usersAtStart.map((u) => u.toJSON())

    const newUser = {
      username: 'PatJaMat',
      name: 'Patti Tilanne',
      password: 'pahattilanteet',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    let usersAtEnd = await User.find({})
    usersAtEnd = usersAtEnd.map((u) => u.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    let usersAtStart = await User.find({})
    usersAtStart = usersAtStart.map((u) => u.toJSON())

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'Salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    let usersAtEnd = await User.find({})
    usersAtEnd = usersAtEnd.map((u) => u.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
