const _ = require('lodash')

const dummy = (blogs) => {
  return blogs ? 1 : 0
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
}

const mostBlogs = (blogs) => {

  const authorBlogs = _.countBy(blogs, 'author')
  const mostBlogsAuthor = _.maxBy(_.keys(authorBlogs), (author) => authorBlogs[author])
  const numberOfBlogs = authorBlogs[mostBlogsAuthor]

  return {
    author: mostBlogsAuthor,
    blogs: numberOfBlogs
  }
}

const mostLikes = (blogs) => {

  const authorLikes = _.mapValues(_.groupBy(blogs, 'author'), (blogs) => {
    return _.sumBy(blogs, 'likes')
  })

  const mostLikesAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author])

  const totalLikes = authorLikes[mostLikesAuthor]

  return {
    author: mostLikesAuthor,
    likes: totalLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}