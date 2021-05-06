const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) { return {} }
  const {
    __v, _id, url, ...blogWithHighestLikes
  } = blogs.sort((x, y) => y.likes - x.likes)[0]

  return blogWithHighestLikes
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return {} }
  const blogCounts = Object.entries(_.groupBy(blogs, (blog) => blog.author))
    .map(([author, y]) => ({ author, blogs: y.length }))
  const authorWithHighestBlogCount = blogCounts.sort((x, y) => y.blogs - x.blogs)[0]
  return authorWithHighestBlogCount
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return {} }
  const likeCounts = Object.entries(_.groupBy(blogs, (blog) => blog.author))
    .map(([author, y]) => ({ author, likes: y.reduce((sum, blog) => sum + blog.likes, 0) }))
  const authorWithHighestLikeCount = likeCounts.sort((x, y) => y.likes - x.likes)[0]
  return authorWithHighestLikeCount
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}
