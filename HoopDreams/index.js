const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");
const {basketballFields} = require('./services/basketballFieldService');

const { Player, PickupGame, SignupPlayer } = require("./data/db");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Player,
    PickupGame,
    SignupPlayer,
    basketballFields
  }
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service is running on ${url}`));
