module.exports = `
    createPickupGame(input: PickupGameInput!): PickupGame! 
    removePickupGame(id: String!): Boolean! 
    addPlayerToPickupGame(input: PlayerInput!): PickupGame! 
    removePlayerFromPickupGame(input: PlayerInput): PickupGame!
`;
