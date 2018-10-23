const Schema = require("mongoose").Schema;

module.exports = new Schema({
  playerID: { type: Schema.Types.ObjectId, required: true, ref: "Player" },
  pickupGameID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "PickupGame"
  }
});
