const customErrors = require("../errors");

module.exports = {
  queries: {
    allPlayers: (root, args, context) =>
      new Promise((resolve, reject) => {
        context.Player.find({}, (err, players) => {
          if (err) {
            reject(customErrors.IntervalServerError());
          }
          players.map(p => (p.id = p._id.toString()));
          resolve(players);
        });
      }),

    player: (root, args, context) =>
      new Promise((resolve, reject) => {
        context.Player.findById(args.id, (err, player) => {
          if (err) {
            // add error message
            //console.log("", err.name);
            if (err.name == "CastError") {
              reject(new customErrors.BadRequest());
            } else {
              reject(new customErrors.IntervalServerError());
            }
          }
          resolve(player);
        });
      })
  },
  mutations: {
    createPlayer: (root, args, context) =>
      new Promise((resolve, reject) => {
        const { input } = args;

        const newPlayer = {
          name: input.name
        };

        context.Player.create(newPlayer, (err, createdPlayer) => {
          if (err) {
            reject(customErrors.BadRequest());
          }
          resolve(createdPlayer);
        });
      }),
    updatePlayer: (root, args, context) =>
      new Promise((resolve, reject) => {
        const { id, input } = args;

        context.Player.updateOne(
          { _id: id },
          {
            $set: { name: input.name }
          },
          (err, updatedPLayer) => {
            if (err) {
              reject(customErrors.NotFoundError());
            }
            context.Player.findById(id, (err, player) => {
              if (err) {
                reject(customErrors.NotFoundError());
              }
              resolve(player);
            });
          }
        );
      }),

    removePlayer: (root, args, context) =>
      new Promise((resolve, reject) => {
        //first remove from players
        const { id } = args;
        // delete is deprocated used deleteOne
        context.Player.deleteOne({ _id: id }, (err, removed) => {
          if (err) {
            reject(customErrors.NotFoundError());
          }

          // then remove player from signupPlayer
          context.SignupPlayer.deleteMany({ playerId: id }, (err, removed) => {
            if (err) {
              reject(customErrors.NotFoundError());
            }
            resolve(true);
          });
        });
      })
  },
  types: {
    Player: {
      playedGames: (parent, args, context) =>
        new Promise((resolve, reject) => {
          context.SignupPlayer.find(
            { playerId: parent._id },
            (err, connections) => {
              if (err) {
                reject(customErrors.NotFoundError());
              }
              context.PickupGame.aggregate(
                [
                  {
                    $match: {
                      _id: { $in: connections.map(c => c.pickupGameId) }
                    }
                  }
                ],
                (err, playedGames) => {
                  if (err) {
                    reject(customErrors.IntervalServerError());
                  }
                  console.log(playedGames);
                  playedGames.map(g => (g.id = g._id.toString()));
                  resolve(playedGames);
                }
              );
            }
          );
        })
    }
  }
};
