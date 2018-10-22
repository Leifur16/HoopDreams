module.exports = `
    type Query {
        allBasketballFields: [BasketballField!]!
        allPickupGames: [PickupGame!]!
        allPlayers: [Player!]!
        basketballField(id: Int!): BasketballField
        pickupGame(id: Int!): PickupGame
        player(id: Int!): Player
    }
`;
