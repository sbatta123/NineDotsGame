import React from "react";
import EventLog from "./EventLog";

export default class SocialInteractions extends React.Component {
  
    renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          <span
            className={`satisfied bp3-tag bp3-round ${
              player.get("satisfied") ? "bp3-intent-success" : "bp3-intent-danger"
            }`}
          >
            <span
              className={`bp3-icon-standard ${
                player.get("satisfied") ? "bp3-icon-tick" : "bp3-icon-cross"
              }`}
            />
          </span>

          <img src={player.get("avatar")} />
        </span>
        <span className="name" style={{ color: player.get("nameColor") }}>
          {player.get("name")}
          {self ? " (You)" : ""}
        </span>
      </div>
    );
  }

  render() {
    const { game, stage, player } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    // const events = stage.get("log").map(({ subject, ...rest }) => ({
    //   subject: subjectId && game.players.find(p => p._id === subjectId),
    //   ...rest
    // }));

    return (
      <div className="social-interactions">
        <div className="status">
          <div className="players bp3-card">
            {this.renderPlayer(player, true)}
            {otherPlayers.map(p => this.renderPlayer(p))}
          </div>
        </div>

        {/* <EventLog events={events} stage={stage} player={player} /> */}
      </div>
    );
  }
}