const express = require('express')
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const {userSchemas, userResolvers} = require('./resources/users/routes');
const {taskSchemas, taskResolvers} = require("./resources/tasks/routes")
const {getReq, getRes} = require("./lib/variables")

const {decodeToken} = require("./lib/middleware")


const appRouter = express.Router()

const mergedSchema = buildSchema(`
  type Auth {
    token: String!
  }
  type Success {
    message: String!
  }
  type User{
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
  }

  type LoginStatus{
    isLogedin: Boolean!
  }

  type Task { 
  id: ID! 
  userID: Int! 
  title: String! 
  description: String! 
  dueDate: String! 
  priority: String! 
  status: String! 
  completed: String!
  } 
  type Tasks { tasks: [Task]! }
  type Mutation {
    ${userSchemas.mutation}
    ${taskSchemas.mutation}
  }
  type Query {
    ${userSchemas.query}
    ${taskSchemas.query}
  }
  
`);


const mergedResolvers = {
  ...userResolvers.Mutation,
  ...userResolvers.Query,
  ...taskResolvers.Mutation,
  ...taskResolvers.Query
};

const merger = createHandler({
  schema: mergedSchema,
  rootValue: mergedResolvers,
  graphiql: true, // Enable GraphiQL interface
  context: (req, res)=> {return {req: getReq(), res: getRes()}}
})

appRouter.use("/graphql/auth", decodeToken, (req, res)=>merger(req, res))
appRouter.use("/graphql", (req, res)=>merger(req, res))


module.exports = {appRouter, merger, mergedSchema,  mergedResolvers}