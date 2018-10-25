module.exports = {

    queries: {
        allBasketballFields: (parent, args, context) => {
            return context.basketballFields.response.body;
        },
        basketballField: (parent, args, context) => {
            return context.basketballFields.response.body.find(d => d.id === args.id)
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
