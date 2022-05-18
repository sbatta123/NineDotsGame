import React from "react";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepTwo extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Instructions </h1>
          <p>
          Welcome to 9 dots! You must connect all 9 dots in the square grid with 
            four different lines and without lifting the penn (the game is designed 
            so that when you draw a new line it will begin from the ending point of 
            your previous line). Hit all the yellow dots with the lines to win!
          </p>

          <p>
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={onNext} disabled={!hasNext}>
              Next
            </button>
          </p>
        </div>
      </Centered>
    );
  }
}
