/*
TODO add:
• start : Moment*
• end : Moment*
*/

module.exports = `
    type PickupGame {
        id: ID!
        location: BasketballField!
        registeredPlayers: [Player!]!
        host: Player!
    }
`;
