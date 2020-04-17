import "./App.css";
import React, { Component } from "react";
import User from "./pages/users";
import socketIOClient from "socket.io-client";

var temp = [];
class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      user: [],
      loader: false,
    };
  }
  handlefetch = () => {
    this.setState({ user: [] });
    this.setState({ loader: true });
    fetch("http://localhost:8080/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Query: this.state.search }),
    });
  };

  setter = (user) => {
    if (this.state.loader) {
      this.setState({ loader: false });
      this.setState({ search: "" });
    }
    temp.push(user);
    if (temp.length > 10) {
      temp.shift();
    }
    this.setState({ user: temp });
  };

  handlechange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  componentDidMount = () => {
    var socket = socketIOClient.connect("http://localhost:8080");
    socket.on("tweet", this.setter);
  };
  render() {
    return (
      <div className="App">
        <header>
          <img
            src="https://cdn.clipart.email/fcf0df581fb3270b21dc370803b034ad_logo-twitter-circle-png-transparent-image-47449-free-icons-and-_2267-2267.png"
            width="50"
            height="50px"
          />
          <div>
            <input
              type="text"
              id="search"
              placeholder="search"
              onChange={this.handlechange}
            />
            <button onClick={this.handlefetch}>Search</button>
          </div>
        </header>
        <center>
          {this.state.loader ? (
            <div className="loader">
              <p>Loading...</p>
            </div>
          ) : (
            ""
          )}
          <div>
            <User usr={this.state.user} />
          </div>
        </center>
      </div>
    );
  }
}

export default App;
