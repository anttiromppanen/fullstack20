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
  console.log(blogs)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
