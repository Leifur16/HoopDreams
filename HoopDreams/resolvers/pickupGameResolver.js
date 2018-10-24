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
    createPickupGame: (parent, args, context) => {
      new Promise((resolve, reject) => {
          const { input } = args;
          const newGame =  {
            start: input.start,
            end: input.end,
            basketballFieldId: input.basketballFieldId,
            hostId: input.hostId
          };
          context.PickupGame.create(newGame);
          resolve(newGame);
          })
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
                  //console.log("playedGames: ", playedGames);
                  console.log(playedGames);
                  playedGames.map(g => (g.id = g._id.toString()));
                  resolve(playedGames);
                }
              )
            }
          )
        }),
        location: (parent, args, context) => {
          console.log("basket: ", context.basketballFields.response.body);
          let ret = context.basketballFields.response.body.find(d => d.id === parent.basketballFieldId);

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
