require('dotenv').config()
require('./database/conn')
const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const PORT = process.env.PORT || 3000
const cors = require('cors')
// const seed = require('./seeders/seed')
// const routes = require('./routes/index')
const { errorHandler } = require('./utils/errorHandler')

const corsOptions = { origin: process.env.ALLOW_ORIGIN }
app.use(cors(corsOptions))

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

const users = []

// app.use('/api', routes)
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`

      type User {
        _id: ID!,
        activity_name: String!,
        max_capacity: Int!,
        visibility: Boolean!
      }

      input UserInput {
        activity_name: String!
        max_capacity: Int!
        visibility:Boolean!
      }
      type RootQuery {
        users: [User!]!
      }

      type RootMutation {
        createUser(userInput:UserInput) : User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
  `),
  rootValue: {
    users: () => {
      return users
    },
    createUser: (args) => {
      const { userInput } = args
      const user = {
        _id: Math.random().toString(),
        activity_name: userInput.activity_name,
        max_capacity: userInput.max_capacity,
        visibility: userInput.visibility
      }
      users.push(user)
      return user
    }
  },
  graphiql: true // for visual ui interface
}))
// seed.seedAdmin()
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
