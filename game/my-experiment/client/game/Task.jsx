import React from "react";

import TaskResponse from "./TaskResponse";

export default class Task extends React.Component {
  render() {
    return (
      <div className="task">
        <TaskResponse {...this.props} />
      </div>
    );
  }
}
