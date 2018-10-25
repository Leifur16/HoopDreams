module.exports = `
    createPickupGame(input: PickupGameInput!): PickupGame!
    removePickupGame(id: String!): Boolean!
    addPlayerToPickupGame(input: SignupPlayerInput!): PickupGame! 
    removePlayerFromPickupGame(input: SignupPlayerInput!): PickupGame!
`;
