/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { body } = request

  const user = await User.findOne({ username: body.username })
  const isPasswordCorrect = false
  if (user !== null) await bcrypt.compare(body.password, user.passwordHash)

  if (!user && !isPasswordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const createTokenFromUser = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(createTokenFromUser, process.env.SECRET)

  return response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
