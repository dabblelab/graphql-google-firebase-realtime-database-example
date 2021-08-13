const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
var firebase =require("firebase/app");
require("firebase/database");
const fetch = require("node-fetch");

const firebaseConfig = {
  apiKey: process.env['API_KEY'],
  authDomain: process.env['AUTH_DOMAIN'],
  databaseURL: process.env['DATABASE_URL'],
  projectId: process.env['PROJECT_ID'],
  storageBucket: process.env['STORAGE_BUCKET'],
  messagingSenderId: process.env['MESSAGING_SENDER_ID'],
  appId: process.env['APP_ID'],
  measurementId: process.env['MEASUREMENT_ID']
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function userProfile(data) {
    return {
        age: data.age,
        citizen: data.citizen,
        email: data.email,
        fullName: data.fullName,
        location: data.location
    };
}

const typeDefs = gql`
  type User {
    fullName: String
    email: String!
    location: String
    age: String
    citizen: Boolean
  }
type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
            const data = await fetch(`https://graph-demo-7bd3d-default-rtdb.firebaseio.com/.json`);
            const dataJson = await data.json();
            console.log(dataJson);
            const keys = Object.keys(dataJson);
            console.log(dataJson);
            const mapsKeys = keys.map(function (item) {
                const userData = dataJson[item];
                console.log(userData);
                const graphqlUser = userProfile(userData);
                return graphqlUser;
            });
            return mapsKeys;
        }
  }
};

async function gqlServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true
  })
await server.start()

  const app = express()
  server.applyMiddleware({app, path: '/', cors: true})
app.listen({port:5000}, ()=>
  console.log(`🚀 Server ready at http://localhost:5000`)
)
  return app
}



module.exports = gqlServer
