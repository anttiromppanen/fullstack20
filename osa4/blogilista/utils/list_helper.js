const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, item) => sum + item.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((prev, current) => {
    if (prev.likes > current.likes) return prev
    return current
  })

  return mostLikes
}

const mostBlogs = (blogs) => {
  const result = _(blogs)
    .countBy('author')
    .map((key, value) => ({ author: value, blogs: key }))
    .value()

  return _.last(result)
}

const mostLikes = (blogs) => {
  const result = _(blogs)
    .groupBy('author')
    .map((key, value) => ({ author: value, likes: _.sumBy(key, 'likes') }))
    .orderBy('likes')
    .value()

  return _.last(result)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
