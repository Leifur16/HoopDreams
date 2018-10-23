module.exports = {
  queries: {
    allPlayers: (root, args, context) =>
      new Promise((resolve, reject) => {
        context.Player.find({}, (err, player) => {
          if (err) {
            // put error message here
            reject(err);
          }
          resolve(player);
        });
      })
  }
};

/*,
      player: (root, args, context) =>
        new Promise((resolve, reject) => {
          const { id } = args;
          console.log(args);
          console.log(id);
          //context.Player.findById(args.id, (err, art))
        })*/
