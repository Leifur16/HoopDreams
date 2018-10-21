//const Moment = require("../scalar");
//console.log(Moment);

/* TODO add: 
yearOfCreation : Moment*
• pickupGames An array of PickupGame (where the array cannot be null nor the
items within the array)
• status: BasketballFieldStatus*
*/

module.exports = `
    type BasketballField {
        id: ID!
        name: String!
        capacity: Int!

    }
`;
