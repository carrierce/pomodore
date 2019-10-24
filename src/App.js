import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    countDown: 1000,
    atWork: false,
    taskGenerated: false,
    pomodoreCount: 0,
    mainButton: "Start",
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

  onUpdateItem = (event, i) => {
    event.preventDefault();
    this.setState(state => {
      const pomodoreTaskArray = state.pomodoreTaskArray.map((item, j) => {
        if (j === i) {
          return (item = this.state.pomodoreTaskDescription);
        } else {
          return item;
        }
      });
      return {
        pomodoreTaskArray
      };
    });
    this.setState({
      pomodoreTaskDescription: ""
    });
  };

  generatePomodoreEntry = () => {
    this.setState({
      pomodoreTaskArray: [
        ...this.state.pomodoreTaskArray,
        this.state.pomodoreTaskDescription
      ],
      pomodoreTaskDescription: ""
    });
  };

  countDown = async () => {
    if (this.state.countDown > 0) {
      this.setState({
        countDown: this.state.countDown - 1
      });
    } else {
      this.setState({
        pomodoreCount: this.state.pomodoreCount + 1,
        atWork: false,
        countDown: 1000,
        taskGenerated: false,
        mainButton: "Start"
      });
      clearInterval(this.intervalId);
    }
    if (this.state.countDown === 300) {
      const a = await this.audio.play();
    }
    if (this.state.countDown === 200) {
      const b = await this.audio.play();
    }
  };

  startTime = () => {
    if (!this.state.taskGenerated) {
      this.generatePomodoreEntry();
    }
    clearInterval(this.intervalId);
    this.setState({
      atWork: true,
      taskGenerated: true
    });
    this.intervalId = setInterval(() => {
      this.countDown();
    }, 10);
  };

  pauseTime = () => {
    clearInterval(this.intervalId);
    this.setState({
      atWork: false,
      mainButton: "Resume"
    });
  };

  skipBreak = () => {
    this.generatePomodoreEntry();
    this.setState({
      countDown: 1000,
      pomodoreCount: this.state.pomodoreCount + 1
    });
    this.startTime();
  };

  resetTimer = () => {
    this.setState({
      countDown: 1000,
      atWork: false,
      taskGenerated: false,
      pomodoreCount: this.state.pomodoreCount + 1
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
          <form onSubmit={event => this.onUpdateItem(event, index)}>
            <label>
              Pomodore #{index + 1}
              {this.state.pomodoreTaskArray[index] ? (
                <p>{this.state.pomodoreTaskArray[index]}</p>
              ) : (
                <input
                  type="text"
                  placeholder="What will you do with these 25 minutes?"
                  onChange={this.handleChange}
                />
              )}
            </label>
            {!this.state.pomodoreTaskArray[index] && (
              <input type="submit" value="Submit" />
            )}
          </form>
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
        {!this.state.atWork ? (
          <button className="btn" onClick={this.startTime}>
            {this.state.mainButton}
          </button>
        ) : (
          <div>
            <button className="btn" onClick={this.pauseTime}>
              Pause
            </button>
            <button className="btn" onClick={this.resetTimer}>
              End
            </button>
          </div>
        )}
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
        <div>{this.taskArray()}</div>
      </div>
    );
  }
}

export default App;
