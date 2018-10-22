const db = require('../data/db');

module.exports = {
    queries: {
        allBasketballFields: () => {
            return db.basketballFields.response.body;
        },
        basketballField: (parent, args) => {
            return db.basketballFields.response.body.find(d => d.id === args.id)
        }
    }
};
