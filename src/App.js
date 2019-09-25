import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    countDown: 1800,
    atWork: false,
    buttonTitle: "Start",
    pomodoreCount: 0,
    pomodoreTaskDescription: "",
    pomodoreTaskArray: []
  };

  audio = new Audio(
    "https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3"
  );

  handleChange = event => {
    this.setState({
      pomodoreTaskDescription: event.target.value
    });
  };

  handleSubmit = event => {
    this.setState({
      pomodoreTaskArray: [
        ...this.state.pomodoreTaskArray,
        this.state.pomodoreTaskDescription
      ],
      pomodoreTaskDescription: ""
    });
    event.preventDefault();
  };

  countDown = () => {
    if (this.state.countDown > 0) {
      this.setState({
        countDown: this.state.countDown - 1
      });
    } else {
      this.setState({
        pomodoreCount: this.state.pomodoreCount + 1,
        atWork: false,
        countDown: 1800
      });
      clearInterval(this.intervalId);
    }
    if (this.state.countDown === 300) {
      this.audio.play();
    }
  };

  startTime = () => {
    clearInterval(this.intervalId);
    this.setState({
      atWork: true
    });
    this.intervalId = setInterval(() => {
      this.countDown();
    }, 1000);
  };

  pauseTime = () => {
    clearInterval(this.intervalId);
    this.setState({
      atWork: false
    });
  };

  skipBreak = () => {
    this.setState({
      countDown: 1800,
      pomodoreCount: this.state.pomodoreCount + 1
    });
    this.startTime();
  };

  resetTimer = () => {
    this.setState({
      countDown: 1800,
      atWork: false
    });
    clearInterval(this.intervalId);
  };

  formatTimer = timeOff => {
    return (
      <p>
        {(this.state.countDown - timeOff) / 60 >= 10
          ? Math.floor((this.state.countDown - timeOff) / 60)
          : "0" + Math.floor((this.state.countDown - timeOff) / 60)}
        :
        {(this.state.countDown - timeOff) % 60 >= 10
          ? (this.state.countDown - timeOff) % 60
          : "0" + ((this.state.countDown - timeOff) % 60)}
      </p>
    );
  };

  taskArray = () => {
    let taskArray = this.state.pomodoreTaskArray;
    let tasks = taskArray.map((task, index) => {
      return (
        <div key={index}>
          {index + 1} {task}
        </div>
      );
    });
    return <div>{tasks}</div>;
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Pomadorable</h1>
        </div>
        {this.state.atWork && (
          <button className="btn" onClick={this.pauseTime}>
            Pause
          </button>
        )}
        {!this.state.atWork && (
          <button className="btn" onClick={this.startTime}>
            Start
          </button>
        )}
        <button className="btn" onClick={this.resetTimer}>
          Reset
        </button>
        {this.state.countDown < 300 && (
          <button className="btn" onClick={this.skipBreak}>
            Skip Break
          </button>
        )}
        <div className="timeDisplay">
          <h2>
            {this.state.countDown > 300 ? "Count Down:" : "Break Time Baby!"}
          </h2>
          {this.state.countDown > 300
            ? this.formatTimer(300)
            : this.formatTimer(0)}
          <h2>Today's Pomadorables</h2>
          <p>{this.state.pomodoreCount}</p>
        </div>
        {/* <div className="pomodoroTask">
          <form onSubmit={this.handleSubmit}>
            <label>
              Task:
              <input
                type="text"
                value={this.state.pomodoreTaskDescription}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>{this.taskArray()}</div> */}
      </div>
    );
  }
}

export default App;
