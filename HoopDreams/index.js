const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");

const server = new ApolloServer({
  typeDefs
  //    Add resolvers
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service is running on ${url}`));
