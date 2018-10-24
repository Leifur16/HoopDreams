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
  },
  introspection: true,
  formatError: error => {
    console.log(error);
    return new Error('Internal server error');
  }
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service is running on ${url}`));
