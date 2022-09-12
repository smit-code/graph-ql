const { buildSchema } = require('graphql')

module.exports = buildSchema(`
      type AuthUser {
        id: String!,
        first_name: String!,
        last_name: String!,
        email: String!,
      }  

      type AuthData {
        token:String!,
        user:AuthUser!,
        message:String!
      }
      
      input AuthInput {
        email:String!,
        password:String!
      }
  
      type User {
        _id: ID!
        first_name: String
        last_name: String
        address: String
        email: String!
        phone: Int
      }
      
      input UserInput {
        first_name: String
        last_name: String
        address: String
        email: String!
        phone: Int
        password: String!
      }
      
      type Club {
        _id: ID!
        activity_name: String!
        max_capacity: Int!
        visibility: Boolean!
      }

      input ClubInput {
        activity_name: String!
        max_capacity: Int!
        visibility:Boolean!
      }
      
      type RootQuery {
        clubs: [Club!]!,
        users: [User!]!,
        login(authInput: AuthInput): AuthData!
      }

      type RootMutation {
        createClub(clubInput:ClubInput) : Club,
        registerUser(userInput:UserInput): User
      }

      schema {
        query: RootQuery 
        mutation: RootMutation
      }
  `)
