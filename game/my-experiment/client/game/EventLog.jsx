import React from "react";
import Author from "./Author";

export default class EventLog extends React.Component {
  componentDidMount() {
    this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events.length < this.props.events.length) {
      this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
    }
  }

  render() {
    const { events, player } = this.props;

    return (
      <div className="eventlog bp3-card">
        <div className="events" ref={(el) => (this.eventsEl = el)}>
          {events.map((event, i) => (
            <Event
              key={i}
              event={event}
              self={event.subject ? player._id === event.subject._id : null}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Event extends React.Component {
  render() {
    const {
      subject,
      roundId,
      verb,
      object,
      target,
      state,
      at,
    } = this.props.event;
    const { self } = this.props;
    let content;
    switch (verb) {
      case "roundStarted":
        content = <div className="content">Round {roundId} started</div>;
        break;
      case "Line Drawn":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> drew{" "}
            <div className="object">{object}</div> line{" "}
            <div className="target">Room {target}</div>.
          </div>
        );
        break;
      case "releasedStudent":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> released{" "}
            <div className="object">{object}</div> without moving it.
          </div>
        );
        break;
      default:
        console.error(`Unknown Event: ${verb}`);

        return null;
    }
  }
}