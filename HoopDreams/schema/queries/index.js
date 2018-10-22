module.exports = `
    type Qurey {
        allBasketballFields: [BasketballField!]!
        allPickupGames: [PickupGame!]!
        allPlayers: [Player!]!
        basketballField(id: String!): BasketballField
        pickupGame(id: String!): PickupGame
        player(id: String!): Player
    }
`;
