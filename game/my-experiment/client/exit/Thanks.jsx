import React from "react";
// import {hello} from "/Users/sarika.batta/Desktop/NineDotsGame/game/my-experiment/client/hello.png";
import { Centered } from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  render() {
    return (
      <div className="finished">
        <div>
          <h4> Sample Solutions: </h4>
          <img src="images/hello.png" width="500px"/>
          <h4>Finished!</h4>
          <p>Thank you for participating!</p>
        </div>
      </div>
    );
  }
}
