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

// app.use('/api', routes)
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
      type RootQuery {
        users: [String!]!
      }

      type RootMutation {
        createUser(name: String) : String
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
  `),
  rootValue: {
    users: () => {
      return ['ram', 'shyam']
    },
    createUser: (args) => {
      const userName = args.name
      return userName
    }
  },
  graphiql: true
}))
// seed.seedAdmin()
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
