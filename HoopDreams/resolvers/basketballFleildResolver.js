const db = require('../data/db');

module.exports = {

    queries: {
        allBasketballFields: () => {
            return db.basketballFields;
        }
    }
};
