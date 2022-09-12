const { login, registerUser } = require('../../controllers/authController')
const { users } = require('../../controllers/userController')
const { clubs, createClub } = require('../../controllers/clubController')

module.exports = {
  createClub,
  clubs,
  registerUser,
  login,
  users
}
