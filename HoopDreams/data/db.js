const mongoose = require("mongoose");
const playerSchema = require("../schema/mongodb/player");
const pickupGameSchema = require("../schema/mongodb/pickupGame");
const signupPlayerSchema = require("../schema/mongodb/signupPlayer");

var connection = mongoose.createConnection(
  "mongodb://abc123:abc123@ds139193.mlab.com:39193/hoopdreams-leifur16",
  { useNewUrlParser: true }
);

module.exports = {
  Player: connection.model("Player", playerSchema),
  PickupGame: connection.model("PickupGame", pickupGameSchema),
  SignupPlayer: connection.model("SignupPlayer", signupPlayerSchema),
  connection
};
