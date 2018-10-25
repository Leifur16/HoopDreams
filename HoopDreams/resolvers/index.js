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
      moment.locale('is');
      return value = moment(value).format('llll');
    },
    parseliteral: value => {
      moment.locale('is');
      return value = moment(value).format('llll');
    },
    serialize: value => {
       moment.locale('is');
       return value = moment(value).format('llll');
    }

  }),
  Mutation: {
    ...playerResolver.mutations,
    ...pickupGameResolver.mutations
  },
    ...basketballResolver.types,
    ...pickupGameResolver.types

};
