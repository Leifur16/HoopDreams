const basketballResolver = require("./basketballFieldResolver");
const playerResolver = require("./playerResolver");
const pickupGameResolver = require('./pickupGameResolver');
const {GraphQLScalarType} = require('graphql');
const moment = require('moment')

module.exports = {
  Query: {
    ...basketballResolver.queries,
    ...playerResolver.queries,
    ...pickupGameResolver.queries
  },
  Moment:
    new GraphQLScalarType({
    name: "Moment",
    description: "used for getting Icelandic locale in 'llll' format",
    parsevalue: value => {
      return value;
    },
    parseliteral: value => {
      return value;
    },
    serialize: value => {
       moment.locale('is');
       return value = moment().format('llll');
    }

  }),
  Mutation: {
    ...playerResolver.mutations,
    ...pickupGameResolver.mutations
  },
    ...basketballResolver.types,
    ...pickupGameResolver.types

};
