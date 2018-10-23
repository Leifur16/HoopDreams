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
    /// this does not work, to sleepy to finish
    updatePlayer: (root, args, context) =>
      new Promise((resolve, reject) => {
        const { input } = args;
        //collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
        //db.products.save( { _id: 100, item: "water", qty: 30 } )
        context.Player.updateOne(
          { _id: args.id },
          {
            $set: { name: input.name }
          } /*,
          (err, updatePlayer) => {
            console.log("updatePlayer: ", updatePlayer);
            console.log("Error: ", err);
            if (err) {
              //TODO add error stuff
              reject(err);
            }
            updatePlayer.name = input;
            resolve(updatePlayer);
          }*/
        );
        context.Player.findById(input.id, (err, player) => {
          if (err) {
            // add error message
            reject(err);
          }
          resolve(player);
        });
      })

    //removePlayer
  }
};
