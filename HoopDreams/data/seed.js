const { Player, PickupGame, SignupPlayer } = require("./db");

const getResourceIdByName = (resources, prop, value) =>
  resources.find(elem => elem[prop] === value);

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
      console.log(players);

      PickupGame.insertMany(
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
            console.log(players);
          });
        }
      );
    });
  }
);
