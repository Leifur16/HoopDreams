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
      registeredPlayers: (parent, args, context) => {
        return context.Player.find( {}, (err, value) => {
          new Promise((resolve, reject) => {
            if(err) reject(err);

            context.SignupPlayer.find({playerId: value.id}, (err, pValue) => {
              console.log(pValue);
            })
          })
        })

        /*return context.SignupPlayer.find({ pickupGameId : parent.id }, (err, value) => {
          new Promise((resolve, reject) => {
            if(err) reject(err);

            context.Player.find({}, (err, pValue) => {

              var arr = [];
              console.log("pValue: ", pValue);
              console.log("value: ", value);
              pValue.map(p => {
                if(p.id === value.playerId) arr.push(pValue);
              });
              //console.log(arr);
              resolve(arr);
            })
            resolve(value);
          })
        });*/
      }
    },
    Player: {
      playedGames: (parent, args, context) => {
        return context.SignupPlayer.find({ playerId : parent.id }, (err, value) => {
          new Promise((resolve, reject) => {

            if(err) reject(err);

            resolve(value);
          })
        });
      }
    }
  }
}
