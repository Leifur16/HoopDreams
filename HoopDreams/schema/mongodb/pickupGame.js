/*Skoðaðu mongoose-moment á NPM.*/

const Schema = require("mongoose").Schema;

module.exports = new Schema({
  start: { type: Schema.Types.Date, required: true },
  end: { type: Schema.Types.Date, required: true },
  basketballFieldId: {
    type: String,
    required: true,
    ref: "PickupGame"
  },
  hostId: { type: Schema.Types.ObjectId, required: true, ref: "Player" }
});
