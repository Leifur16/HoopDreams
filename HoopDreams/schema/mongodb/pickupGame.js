const Schema = require("mongoose").Schema;

module.exports = new Schema({
  start: { type: Schema.Types.Date, required: true },
  basketballDieldID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "PickupGame"
  },
  hostID: { type: String, required: true, ref: "Player" }
});
