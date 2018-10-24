const { Player, PickupGame, SignupPlayer, connection } = require("./db");

const getResourceIdByName = (resources, prop, value) =>
  resources.find(elem => elem[prop] === value);

Object.keys(connection.collections).forEach(collection => {
  if (collection === "players") {
    Player.collection.drop();
  }
  if (collection === "pickupgames") {
    PickupGame.collection.drop();
  }
  if (collection === "signupplayer") {
    console.log("DELETETHIS");
    SignupPlayer.collection.drop();
  }
});

// Insert Players
Player.insertMany(
  [
    {
      name: "Xerxes"
    },
    {
      name: "Rabi"
    },
    {
      name: "Zuzana"
    },
    {
      name: "Missie"
    },
    {
      name: "Robb"
    },
    {
      name: "tibi"
    },
    {
      name: "Bjarki"
    },
    {
      name: "Smári"
    }
  ],
  err => {
    if (err) {
      throw new Error(err);
    }
    Player.find({}, (err, players) => {
      if (err) {
        throw new Error(err);
      }

      //console.log(players);
      /// ------- PickupGames ------- ///

      PickupGame.insertMany(
        [
          {
            start: "2018-10-10T00:00:00.000Z",
            end: "2018-10-10T00:00:00.000Z",
            basketballFieldId: "ef42039e-77bc-40a3-8121-c2a5424ebcdb",
            hostId: getResourceIdByName(players, "name", "tibi")
          },
          {
            start: "2018-10-10T00:00:00.000Z",
            end: "2019-10-10T00:00:00.000Z",
            basketballFieldId: "1798a72b-b619-4150-b604-5de20fa3cc56",
            hostId: getResourceIdByName(players, "name", "Smári")
          },
          {
            start: "2018-10-10T00:00:00.000Z",
            end: "2018-12-10T00:00:00.000Z",
            basketballFieldId: "31154ca3-3eef-4dbf-b438-ec5d4d3af708",
            hostId: getResourceIdByName(players, "name", "Bjarki")
          }
        ],
        err => {
          if (err) {
            console.log("ERROR!");
            throw new Error(err);
          }
          PickupGame.find({}, (err, pickupGames) => {
            if (err) {
              console.log("ERROR!!");
              throw new Error(err);
            }
            /// ------- PickupGames ------- ///

            //console.log("PICKUPGAMES: ", pickupGames);

            /*console.log(
              "get pickupgame id: ",
              getResourceIdByName(
                pickupGames,
                "basketballFieldId",
                "31154ca3-3eef-4dbf-b438-ec5d4d3af708"
              )
            );*/
            //console.log(getResourceIdByName(players, "name", "Xerxes"));

            SignupPlayer.insertMany(
              [
                {
                  playerId: getResourceIdByName(players, "name", "Xerxes"),
                  pickupGameId: getResourceIdByName(
                    pickupGames,
                    "basketballFieldId",
                    "31154ca3-3eef-4dbf-b438-ec5d4d3af708"
                  )
                },
                {
                  playerId: getResourceIdByName(players, "name", "Rabi"),
                  pickupGameId: getResourceIdByName(
                    pickupGames,
                    "basketballFieldId",
                    "1798a72b-b619-4150-b604-5de20fa3cc56"
                  )
                },
                {
                  playerId: getResourceIdByName(players, "name", "Zuzana"),
                  pickupGameId: getResourceIdByName(
                    pickupGames,
                    "basketballFieldId",
                    "31154ca3-3eef-4dbf-b438-ec5d4d3af708"
                  )
                },
                {
                  playerId: getResourceIdByName(players, "name", "Zuzana"),
                  pickupGameId: getResourceIdByName(
                    pickupGames,
                    "basketballFieldId",
                    "ef42039e-77bc-40a3-8121-c2a5424ebcdb"
                  )
                }
              ],
              err => {
                if (err) {
                  throw new Error(err);
                }
                SignupPlayer.find({}, (err, signupPlayers) => {
                  if (err) {
                    throw new Error(err);
                  }
                });
              }
            );
          });
        }
      );
    });
  }
);
