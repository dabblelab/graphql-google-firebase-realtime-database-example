const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

async function gqlServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  })
  await server.start()

  const app = express()

  server.applyMiddleware({ app, path: '/', cors: true })

  app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000`)
  )
  return app
}
module.exports = gqlServer
