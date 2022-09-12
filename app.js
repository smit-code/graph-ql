require('dotenv').config()
require('./database/conn')
const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const { seedAdmin } = require('./seeders/seed')
const { errorHandler } = require('./utils/errorHandler')
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const corsOptions = { origin: process.env.ALLOW_ORIGIN }
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true // for visual ui interface
}))

seedAdmin()
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
