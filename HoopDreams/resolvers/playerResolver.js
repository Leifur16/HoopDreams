module.exports = {
  queries: {
    allPlayers: (root, args, context) =>
      new Promise((resolve, reject) => {
        context.Player.find({}, (err, players) => {
          if (err) {
            // put error message here
            reject(err);
          }
          //resolve(player);

          /*context.SignupPlayer.find({}, (err, signupPlayers) => {
            if (err) {
              reject(err);
            }
            //console.log("SignupPlayer", SignupPlayer);
          });

          //console.log(context.PickupGame);
          context.PickupGame.find({}, (err, pickupGames) => {
            if (err) {
              reject(err);
            }
            //console.log("PickupGame: ", pickupGames);
          });

          newObj = players.map(p => {

            //const playedGamesArr = [];
            return { p };
          });*/
          //console.log("newObj", newObj);

          resolve(players);
        });
      }),

    player: (root, args, context) =>
      new Promise((resolve, reject) => {
        context.Player.findById(args.id, (err, player) => {
          if (err) {
            // add error message
            reject(err);
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
          name: input.name,
          id: input.name.toLowerCase().replace(" ", "-")
        };

        context.Player.create(newPlayer, (err, createdPlayer) => {
          if (err) {
            //TODO add error stuff
            reject(err);
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
              //TODO add error stuff
              reject(err);
            }
            context.Player.findById(id, (err, player) => {
              if (err) {
                // TODO add error message
                reject(err);
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
        context.Player.deleteOne({ _id: id }, (err, removed) => {
          if (err) {
            // TODO add error message
            reject(err);
          }
          console.log("Removed: ", removed);
          console.log("Error:", err);
          resolve(true);

          // then remove player from signupPlayer
          context.deleteMany({ playerId: id }, (err, removed) => {
            if (err) {
              //TODO add error message
            }
            console.log("removed I think");
          });
        });
      })
  },
  types: {
    Player: {
      playedGames: (parent, args, context) =>
        new Promise((resolve, reject) => {
          /*console.log("RAAAAAAAAAAASSSSSSSSSSSss");

          console.log("Parent: ", parent);

          console.log("Context: ", context);*/
          context.SignupPlayer.find(
            { playerId: parent._id },
            (err, connections) => {
              //console.log(connections);
              if (err) {
                reject(err);
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
        })
    }
  }
};
