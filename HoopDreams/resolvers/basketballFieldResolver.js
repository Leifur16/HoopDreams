const {GraphQLScalarType} = require('graphql');
const moment = require('moment')


module.exports = {

    queries: {
        allBasketballFields: (parent, args, context) => {
            return context.basketballFields.response.body;
        },
        basketballField: (parent, args, context) => {
            return context.basketballFields.response.body.find(d => d.id === args.id)
        }
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

            })


};
