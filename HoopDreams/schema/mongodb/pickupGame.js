const Schema = require("mongoose").Schema;

module.exports = new Schema({
  start: { type: Schema.Types.Date, required: true },
  end: { type: Schema.Types.Date, required: true },
  basketballFieldId: {
    type: String,
    required: true,
    ref: "PickupGame"
  },
  hostId: { type: String, required: true, ref: "Player" }
});
