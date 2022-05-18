import Empirica from "meteor/empirica:core";
import "./bots.js";
import "./callbacks.js";
  

// import { taskData } from "./constants";
// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
function getAlters(player, playerIndex, playerIds, alterCount) {
  //using the initial network structure to create the network, otherwise, a random network

  let alterIds = [];
  if (playerIds.length === 12) {
    alterIds = playerIds.filter(
      (elt, i) => initial_network[playerIndex].indexOf(i) > -1
    );
  } else {
    alterIds = _.sample(_.without(playerIds, player._id), alterCount);
  }

  return alterIds;
}

Empirica.gameInit(game => {
  const nodes = [];
  for (let i = 0; i <= game.players.length; i++) {
    nodes.push(i);
  }
  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", 0);
    player.set("nodeId", i);

    const networkNeighbors = nodes.filter(node => node !== i);
    const playerIds = _.pluck(game.players, "_id");
    player.set("neighbors", networkNeighbors);
    const alterIds = getAlters(
      player,
      i,
      playerIds,
      game.treatment.altersCount
    );
    player.set("alterIds", alterIds);
  });

  _.times(1, i => {
    const round = game.addRound();
    round.addStage({
      name: "response",
      displayName: "Experiment:",
      durationInSeconds: 300
    });
    if (game.treatment.altersCount > 0) {
      round.addStage({
        name: "interactive",
        displayName: "Interactive Response",
        durationInSeconds: game.treatment.stageDuration
      });
    }
  });
});
