const basketballResolver = require('./basketballFieldResolver');

module.exports = {
    Query: {
        ...basketballResolver.queries
    },
    Moment: {
        ...basketballResolver.Moment
    }
}
