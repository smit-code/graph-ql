const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { prepareSuccessResponse } = require('../utils/responseHandler')

exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('Invalid username or password.')
    error.statusCode = 422
    throw error
  }

  const isEqual = await bcrypt.compare(password, user.password)

  if (!isEqual) {
    const error = new Error('Invalid username or password.')
    error.statusCode = 422
    throw error
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.SECRET_KEY,
    { expiresIn: '12h' }
  )

  const result = {
    token,
    user: {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  }

  return res
    .status(200)
    .json(
      prepareSuccessResponse(result, 'Logged in successfully.')
    )
}

exports.registerUser = async ({ userInput }, req) => {
  const hashPassword = await bcrypt.hash(userInput.password, 12)
  const user = {
    first_name: userInput.first_name,
    last_name: userInput.last_name,
    address: userInput.address,
    email: userInput.email,
    phone: userInput.phone,
    password: hashPassword
  }
  const newUser = await User.create(user)
  return newUser._doc
}
