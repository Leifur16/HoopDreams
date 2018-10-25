const customErrors = require("../errors");

const mongoose = require("mongoose");

module.exports = {
  queries: {
    allPickupGames: (parent, args, context) =>
      new Promise((resolve, reject) => {
        context.PickupGame.find({}, (err, value) => {
          if (err) {
            reject(new customErrors.IntervalServerError());
          }

          resolve(value);
        });
      }),
    pickupGame: (parent, args, context) =>
      new Promise((resolve, reject) => {
        context.PickupGame.findById(args.id, (err, value) => {
          if (err) {
            if ((err.name === "CastError")) {
              reject(new customErrors.BadRequest());
            } else {
              reject(new customErrors.IntervalServerError());
            }
          }
          if(!value) reject(new customErrors.NotFoundError())
          resolve(value);
        })
      })
  },

  mutations: {
    createPickupGame: async (parent, { input }, context) => {

        var field = context.basketballFields.response.body.find(x => x.id === input.basketballFieldId);
        console.log(field);
        if(!field) {
          return new customErrors.NotFoundError();
        }

        const host = context.findById(input.hostId);
        if(!host) {
          return new customErrors.NotFoundError();
        }

        if(field.status === 'CLOSED') return new customErrors.BasketballFieldClosedError();

        var newStart = new Date(input.start);
        var newEnd = new Date(input.end);
        try {
            const value = await context.PickupGame.find({});
            var elem =  value.find((game) =>
              game.start <= newStart <= game.end &&
                  game.start <= newEnd <= game.end &&
                    game.basketballFieldId === input.basketballFieldId)
          if(elem) {
            return new customErrors.PickupGameOverlapError();
          }

          const newGame = {
            start: input.start,
            end: input.end,
            basketballFieldId: input.basketballFieldId,
            hostId: mongoose.Types.ObjectId(input.hostId)
          };

          const newPickupGame = await context.PickupGame.create(newGame);
          return(newPickupGame);

        } catch (e) {
          if(e.name === "CastError") {
            return new customErrors.BadRequest();
          } else {
            return new customErrors.IntervalServerError();
          }

        }
    },
    removePickupGame: async (root, args, context) => {
        //first remove from players
        const { id } = args;

        try {
          const value = await context.PickupGame.findById(id);

          if(!value) {
            return new customErrors.NotFoundError();
          }

          // delete is deprocated used deleteOne
          context.PickupGame.deleteOne({ _id: id }, (err, removed) => {
            if (err) {
              return new customErrors.BadRequest();
            }
            // then remove player from signupPlayer
            context.SignupPlayer.deleteMany(
              { pickupGameId: id },
              (err, removed) => {
                if (err) {
                  return new customErrors.NotFoundError();
                }

              }
            )
          })
          return true;
        } catch (e) {
          if(e.name === "CastError") {
            return new customErrors.BadRequest();
          } else {
            return new customErrors.IntervalServerError();
          }
        }

  },
  addPlayerToPickupGame: (parent, args, context) =>
    new Promise((resolve, reject) => {
      const { input } = args;
      context.PickupGame.findById(input.pickupGameId, (err, pickupGame) => {
        if (err) {
          reject(err);
        }
        if (new Date() > pickupGame.end) {
          reject(customErrors.PickupGameAlreadyPassedError())
        } else {
          resolve(pickupGame);
        }

      });
    }),
  removePlayerFromPickupGame: async (parent, args, context) => {
      //context.
      const { input } = args;

      try {
        const pickupGame = await context.PickupGame.findById(input.pickupGameId);
          if (!pickupGame) {
            return customErrors.NotFoundError();
          }
          console.log("pickupGame: ", pickupGame);
          if (new Date() > pickupGame.end) {
            return new customErrors.PickupGameAlreadyPassedError();
          } else {
            const playerSignup = await context.SignupPlayer.find({playerId: input.playerId, pickupGameId: input.pickupGameId});
            console.log("player: ", playerSignup);
            
            if(playerSignup.length === 0) {return new customErrors.NotFoundError();}
            const del = await context.SignupPlayer.deleteMany(
              { pickupGameId: input.pickupGameId, playerId: input.playerId },
              (err, removed) => {
                if (err) {
                  // throw error
                  return err;
                }
                return pickupGame;
              }
            );
          }
          return pickupGame;

      } catch (e) {
        return new customErrors.BadRequest();
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
