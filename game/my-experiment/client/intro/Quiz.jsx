import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Quiz extends React.Component {
  state = { sum: ""};

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.sum !== "4") {
      alert("Incorrect! Read the instructions, and please try again.");
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    const { sum, horse } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1> Quick quiz to make sure you're ready for the game! </h1>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="lines">How many lines can you use?</label>
              <input
                type="text"
                dir="auto"
                id="sum"
                name="sum"
                placeholder="e.g. 3"
                value={sum}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Back to instructions
              </button>
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </Centered>
    );
  }
}
