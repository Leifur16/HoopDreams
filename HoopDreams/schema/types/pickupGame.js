/*
TODO add:
• start : Moment*
• end : Moment*
*/

module.exports = `
    type PickupGame {
        id: ID!
        start: Moment!
        end: Moment!
        location: BasketballField!
        registeredPlayers: [Player]
        host: Player!
    }
`;
