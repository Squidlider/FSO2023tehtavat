const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Aku Ankka',
    url: 'gogole.com',
    likes: 120,
  },
  {
    title: 'Very much GOAT',
    author: 'Iines Ankka',
    url: 'gogole.com',
    likes: 17,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}

