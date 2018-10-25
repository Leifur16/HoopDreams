const Moment = require("../scalar");

//console.log(Moment);

/* TODO add:
• yearOfCreation : Moment*
• status: BasketballFieldStatus*
*/

module.exports = `
    type BasketballField {
        id: ID!
        name: String!
        capacity: Int!
        yearOfCreation: Moment!
        pickupGames: [PickupGame]
        status: BasketballFieldStatus!
    }
`;
