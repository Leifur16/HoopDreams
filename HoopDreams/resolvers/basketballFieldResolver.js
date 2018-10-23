const db = require('../services/basketballFieldService');
const {GraphQLScalarType} = require('graphql');
const Moment = require('../schema/scalar');
const moment = require('moment')


module.exports = {

    queries: {
        allBasketballFields: () => {
            return db.basketballFields.response.body;
        },
        basketballField: (parent, args) => {
            return db.basketballFields.response.body.find(d => d.id === args.id)
        }
        /*addBasketballField: (parent, args) => {
            const newBasketballField = {
                id: args.input.name.toLowerCase().replace(' ', '-'),
                name: args.input.name,
                capacity: args.input.capacity,
                status: args.input.status,
                yearOfCreation: args.input.yearOfCreation
            };

        }*/
    },
    Moment: {
        getMoment: () => {
            console.log("inside moment");
             new GraphQLScalarType({
              name: "Moment",
              description: "used for getting Icelandic locale in 'llll' format",
              parsevalue: value => {
                console.log("parseValue");
                return value = value().format('llll');;
              },
              parseliteral: value => {

                console.log("parseLiteral");
                return value().format('llll');
              },
              serialize: value => {
                 console.log(value().format('llll'));
                 return value = moment().format('llll');
              }

            })
        }
    }
};
