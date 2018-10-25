const customErrors = require("../errors");

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
    createPickupGame: (parent, args, context) => {
      new Promise((resolve, reject) => {
        const { input } = args;
        const newGame = {
          start: input.start,
          end: input.end,
          basketballFieldId: input.basketballFieldId,
          hostId: input.hostId
        };
        context.PickupGame.create(newGame);
        resolve(newGame);
      });
    },
    addPlayerToPickupGame: (parent, args, context) =>
      new Promise((resolve, reject) => {
        const { input } = args;
        context.PickupGame.findById(input.pickupGameId, (err, pickupGame) => {
          if (err) {
            reject(err);
          }
          console.log("pickupgame: ", pickupGame);
          // check if passed
          console.log("end:", pickupGame.end);
          //console.log("ned Date(): ", new Date());
          if (new Date() > pickupGame.end) {
            console.log("game has ended");
            // throw error
          } else {
            console.log("date has not ended");
          }
          //check if full
          //console.log(pickupGame.)

          resolve(pickupGame);
        });
      }),
    removePlayerFromPickupGame: (parent, args, context) =>
      new Promise((resolve, reject) => {
        //context.
        const { input } = args;
        console.log("input: ", input);
        context.PickupGame.findById(input.pickupGameId, (err, pickupGame) => {
          if (err) {
            reject(err);
          }
          if (new Date() > pickupGame.end) {
            console.log("game has ended");
            // throw error
          } else {
            console.log("date has not ended");
            context.SignupPlayer.deleteOne(
              { pickupGameId: input.pickupGameId, playerId: input.playerId },
              (err, removed) => {
                if (err) {
                  // throw error
                  reject(err);
                }
                resolve(pickupGame);
              }
            );
          }
          // check if pickupgame is done
          resolve(pickupGame);
        });
      })
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
                  //console.log("playedGames: ", playedGames);
                  console.log(playedGames);
                  playedGames.map(g => (g.id = g._id.toString()));
                  resolve(playedGames);
                }
              );
            }
          );
        }),
      location: (parent, args, context) => {
        console.log("basket: ", context.basketballFields.response.body);
        let ret = context.basketballFields.response.body.find(
          d => d.id === parent.basketballFieldId
        );
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
