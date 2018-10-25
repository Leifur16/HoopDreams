const customErrors = require("../errors");

module.exports = {

    queries: {
        allBasketballFields: (parent, args, context) => {
            return context.basketballFields.response.body;
        },
        basketballField: (parent, args, context) => {
          var ret = context.basketballFields.response.body.find(d => d.id === args.id);
          if(ret === undefined) throw customErrors.NotFoundError;
            return ret;
        }
    },
    types: {
      BasketballField: {
        pickupGames: (parent, args, context) =>
          new Promise((resolve, reject) => {
            context.PickupGame.find(
              { basketballFieldId: parent.id },
              (err, connections) => {
                if (err) {
                  reject(err);
                }
                resolve(connections);
            })
          })
        }
      }
};
