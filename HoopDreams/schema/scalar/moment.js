const { GraphQLScalarType } = require("graphql");

// Todo use moment to do the correct stuff

const resolvers = {
  Moment: new GraphQLScalarType({
    name: "Moment",
    description: "used for getting Icelandic locale in 'llll' format",
    parsevalue: value => {
      return value;
    },
    parseliteral: value => {
      return value;
    },
    serialize: value => `${value} this is incomplete`
  })
};

module.exports = resolvers;
