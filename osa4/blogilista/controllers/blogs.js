/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })

  response.json(blogs.map((u) => u.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request

  const { token } = request
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  if (!blog.title && !blog.url) return response.status(400).end()
  if (!blog.likes) blog.likes = 0

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const { token } = request
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'invalid user' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogFromRequest = request.body

  await Blog.findByIdAndUpdate(request.params.id, blogFromRequest, { new: true })
  response.status(200).end()
})

module.exports = blogsRouter
