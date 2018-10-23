const basketballResolver = require("./basketballFieldResolver");
const playerResolver = require("./playerResolver");

module.exports = {
  Query: {
    ...basketballResolver.queries,
    ...playerResolver.queries
  },
  Moment: {
    ...basketballResolver.Moment
  },
  Mutation: {
    ...playerResolver.mutations
  }
};
