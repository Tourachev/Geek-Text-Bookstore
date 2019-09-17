import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button, Header, List } from "semantic-ui-react";
import "./css/index.css";

import NavBar from "./components/NavBar";
import JumboHeader from "./components/JumboHeader";
import BrowseField from "./components/BrowseField";

import "./css/index.css";

class App extends Component {
  state = { users: [] };

  componentDidMount() {
    fetch("/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div>
        <div className="body">
          <NavBar />
          <div>
            <JumboHeader />
            <BrowseField />
          </div>
          <h1>Users</h1>
          {this.state.users.map(user => (
            <div key={user.id}>{user.username}</div>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
