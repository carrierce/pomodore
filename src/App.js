import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";

class App extends Component {
  state = {
    now: null,
    then: null,
    countdown: null
  };

  componentDidMount() {
    this.timer();
  }

  countdown = () => {
    return moment().format();
  };

  timer = () => {
    setInterval(() => {
      this.setState({
        now: moment().format("hh:mm:ss"),
        then: moment()
          .add(30, "minutes")
          .format("hh:mm:ss")
      });
    }, 1000);
  };

  render() {
    console.log(this.countdown());
    return <div>{this.state.then}</div>;
  }
}

export default App;
