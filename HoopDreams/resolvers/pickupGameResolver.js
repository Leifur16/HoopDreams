const mongoose = require('mongoose');

module.exports = {
  queries: {
    allPickupGames: (parent, args, context) =>
      new Promise((resolve, reject) => {

        context.PickupGame.find({}, (err, value) => {

          if(err){
            console.log(err);
            reject(err);
          }

          resolve(value);
        })
      }).catch(function(err) {
        console.log("promise rejected");
      }),
    pickupGame: (parent, args, context) =>
      new Promise((resolve, reject) => {
        context.PickupGame.findById(args.id , (err, value) => {
          if(err) reject(err);
          resolve(value);
        })
      })
  },

  mutations: {
    createPickupGame: (parent, {input}, context) => {
      return new Promise((resolve, reject) => {

          const newGame =  {
            start: input.start,
            end: input.end,
            basketballFieldId: input.basketballFieldId,
            hostId: mongoose.Types.ObjectId(input.hostId)
          };

          context.PickupGame.create(newGame, (err, createdPlayer) => {
            if(err) {
                reject(err);
            }
            resolve(createdPlayer);
          });
      })
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
          context.SignupPlayer.deleteMany({ pickupGameId: id }, (err, removed) => {
            if (err) {
              //TODO add error message
            }
            resolve(true);
          });
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
                  playedGames.map(g => (g.id = g._id.toString()));
                  resolve(playedGames);
                }
              )
            }
          )
        }),
        location: (parent, args, context) => {
          let ret = context.basketballFields.response.body.find(d => d.id === parent.basketballFieldId);
          return ret;
        }

      },

    Player: {
      playedGames: (parent, args, context) => {
        return context.SignupPlayer.find({ playerId : parent.id }, (err, value) => {
          new Promise((resolve, reject) => {

            if(err) reject(err);

            resolve(value);
          })
        })
      }
    }
  }
}
