const customErrors = require("../errors");

const mongoose = require("mongoose");

module.exports = {
  queries: {
    allPickupGames: (parent, args, context) =>
      new Promise((resolve, reject) => {
        context.PickupGame.find({}, (err, value) => {
          if (err) {
            reject(customErrors.IntervalServerError());
          }

          resolve(value);
        });
      }),
    pickupGame: (parent, args, context) =>
      new Promise((resolve, reject) => {
        context.PickupGame.findById(args.id, (err, value) => {
          if (err) {
            console.log("error.name", error.name);
            if ((error.name = "CastError")) {
              console.log("throw custom error");
              reject(customErrors.BadRequest);
            } else {
              reject(customErrors.IntervalServerError);
            }
          }
          resolve(value);
        });
      })
  },

  mutations: {
    createPickupGame: (parent, { input }, context) => {
      return new Promise((resolve, reject) => {
        const newGame = {
          start: input.start,
          end: input.end,
          basketballFieldId: input.basketballFieldId,
          hostId: mongoose.Types.ObjectId(input.hostId)
        };

        context.PickupGame.create(newGame, (err, createdPlayer) => {
          if (err) {
            reject(err);
          }
          resolve(createdPlayer);
        });
      });
    },
    removePickupGame: (root, args, context) =>
      new Promise((resolve, reject) => {
        //first remove from players
        const { id } = args;
        // delete is deprocated used deleteOne
        context.PickupGame.deleteOne({ _id: id }, (err, removed) => {
          if (err) {
            reject(err);
          }

          // then remove player from signupPlayer
          context.SignupPlayer.deleteMany(
            { pickupGameId: id },
            (err, removed) => {
              if (err) {
                //TODO add error message
              }
              resolve(true);
            }
          );
        });
      }),
    addPlayerToPickupGame: async (parent, args, context) => {
      const { input } = args;
      // check if pickup game exist
      try {
        const pickupGame = await context.PickupGame.findById(
          input.pickupGameId
        );

        // check if player exist
        const player = await context.Player.findById(input.playerId);
        // check if pickupGame is full

        // use different route later.
        const basketballField = await context.basketballFields.response.body.find(
          d => d.id === pickupGame.basketballFieldId
        );

        const registeredPLayersInPickupgame = await context.SignupPlayer.find(
          { pickupGameId: input.pickupGameId },
          (err, connections) => {
            context.Player.aggregate(
              [
                {
                  $match: {
                    _id: { $in: connections.map(c => c.playerId) }
                  }
                }
              ],
              (err, playedGames) => {
                return playedGames;
              }
            );
          }
        );

        console.log(
          registeredPLayersInPickupgame.length,
          " >= ",
          basketballField.capacity,
          registeredPLayersInPickupgame >= basketballField.capacity
        );

        if (registeredPLayersInPickupgame.length >= basketballField.capacity) {
          return new customErrors.PickupGameExceedMaximumError();
        }

        const newSignup = {
          pickupGameId: input.pickupGameId,
          playerId: input.playerId
        };

        const signup = await context.SignupPlayer.create(newSignup);

        return pickupGame;
      } catch (err) {
        if (err) {
          console.log("err: ", err);
          if (err.name == "CastError") {
            return new customErrors.BadRequest();
          } else {
            return new customErrors.IntervalServerError();
          }
        }
      }
    },
    removePlayerFromPickupGame: async (parent, args, context) => {
      const { input } = args;
      try {
        const pickupGame = await context.PickupGame.findById(
          input.pickupGameId
        );
        console.log(new Date(), " > ", pickupGame.end);
        if (new Date() > pickupGame.end) {
          return new customErrors.PickupGameAlreadyPassedError();
        }
        const removed = await context.SignupPlayer.deleteMany({
          pickupGameId: input.pickupGameId,
          playerId: input.playerId
        });
      } catch (err) {
        if (err.name == "CastError") {
          return new customErrors.BadRequest();
        } else {
          return new customErrors.IntervalServerError();
        }
      }
    }
  },
  types: {
    PickupGame: {
      registeredPlayers: (parent, args, context) =>
        new Promise((resolve, reject) => {
          context.SignupPlayer.find(
            { pickupGameId: parent._id },
            (err, connections) => {
              //console.log(connections);
              if (err) {
                reject(err);
              }
              context.Player.aggregate(
                [
                  {
                    $match: {
                      _id: { $in: connections.map(c => c.playerId) }
                    }
                  }
                ],
                (err, playedGames) => {
                  if (err) {
                    reject(err);
                  }
                  playedGames.map(g => (g.id = g._id.toString()));
                  resolve(playedGames);
                }
              );
            }
          );
        }),

      location: (parent, args, context) => {
        let ret = context.basketballFields.response.body.find(
          d => d.id === parent.basketballFieldId
        );
        return ret;
      }
    },
    Player: {
      playedGames: (parent, args, context) => {
        return context.SignupPlayer.find(
          { playerId: parent.id },
          (err, value) => {
            new Promise((resolve, reject) => {
              if (err) reject(err);

              resolve(value);
            });
          }
        );
      }
    }
  }
};
