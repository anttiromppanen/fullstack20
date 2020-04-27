const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title && !blog.url) return response.status(400).end()
  if (!blog.likes) blog.likes = 0

  const savedBlog = await blog.save()
  return response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogFromRequest = request.body

  await Blog.findByIdAndUpdate(request.params.id, blogFromRequest, { new: true })
  response.status(200).end()
})

module.exports = blogsRouter
