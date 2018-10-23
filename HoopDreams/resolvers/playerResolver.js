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

          context.SignupPlayer.find({}, (err, signupPlayers) => {
            if (err) {
              reject(err);
            }
            //console.log("SignupPlayer", SignupPlayer);
          });

          console.log(context.PickupGame);
          context.PickupGame.find({}, (err, pickupGames) => {
            if (err) {
              reject(err);
            }
            //console.log("PickupGame: ", pickupGames);
          });

          newObj = players.map(p => {
            console.log(
              "-------------------------------------------------------------------------"
            );
            console.log("...p", { ...p });
            //const playedGamesArr = [];
            return { p };
          });
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
        const newPlayer = { name: input.name };

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
                // add error message
                reject(err);
              }
              resolve(player);
            });
          }
        );
      })

    //removePlayer
  }
};
