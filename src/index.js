import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

import Body from "./components/Body";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/index.css";
// import Login from "./components/Login";
import ApplicationForm from "./components/ApplicationForm";
import ValidationLoginForm from "./components/ValidatedLoginForm";
import { PrivateRoute } from "../src/common/PrivateRoute";
import store from "./common/store";
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";
import { Home } from "./Home/Home";
import { Leads } from "./components/Leads";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div className="body">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  exact
                  path="/signUp"
                  strict
                  component={ApplicationForm}
                />
                <Route
                  path="/login"
                  exact
                  strict
                  component={ValidationLoginForm}
                />
                <Route path="/body" exact component={Body} />
                <Route path="/leads" exact component={Leads} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
