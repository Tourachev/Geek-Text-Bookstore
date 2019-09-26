import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/index.css";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="body">
            <NavBar />
            <Body />
            <Footer />
          </div>

          {/* <Route path="/login" exact component={Login} /> */}
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
