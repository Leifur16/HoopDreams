const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const { Player, PickupGame, SignupPlayer } = require("./data/db");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Player,
    PickupGame,
    SignupPlayer
  }
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service is running on ${url}`));
