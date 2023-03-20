const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have a property called ID', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('blog is saved to the database', async () => {

  const newBlog =
    {
      title: 'Kikka Kuutonen',
      author: 'Iines Ankka',
      url: 'gogole.com',
      likes: 17,
    }


  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  // Find the added blog in the list of blogs
  const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]

  // Check if the added blog has the correct values
  expect(addedBlog.title).toEqual(newBlog.title)
  expect(addedBlog.author).toEqual(newBlog.author)
  expect(addedBlog.url).toEqual(newBlog.url)
  expect(addedBlog.likes).toEqual(newBlog.likes)
})

test('If likes is empty give it a 0 value', async () => {

  const newBlog =
  {
    title: 'Kikka Kuutonen',
    author: 'Iines Ankka',
    url: 'gogole.com',
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
  expect(addedBlog.likes).toEqual(0)
})

test('title and url are required', async () => {
  const newBlog = { author: 'Iines Ankka' }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('update blog by id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedData = {
    title: 'Updated Title',
    author: 'Updated Author',
    url: 'guugle.com',
    likes: 123,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

  expect(updatedBlog.title).toEqual(updatedData.title)
  expect(updatedBlog.author).toEqual(updatedData.author)
  expect(updatedBlog.url).toEqual(updatedData.url)
  expect(updatedBlog.likes).toEqual(updatedData.likes)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Aleksi',
      name: 'Aleksi',
      password: 'ka'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password is too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with too short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Al',
      name: 'Aleksi',
      password: 'kalapallo'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`Al`) is shorter than the minimum allowed length (3).')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
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

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})