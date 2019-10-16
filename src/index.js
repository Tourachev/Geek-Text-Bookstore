import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./components/routes/HomePage";
import Cart from "./components/routes/CartPage";
import Browse from "./components/routes/BrowsePage";
import { ProfilePage } from "./components/routes/ProfilePage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./css/index.css";
import Login from "./components/Login";
import Navbar from "./components/NavBar";
import ApplicationForm from "./components/ApplicationForm";
import Context from "./components/Context";

class Provider extends React.Component {
    state = {
        username: "Bubba",
        isLoggedIn: false,
        login: () => {
            this.setState({ isLoggedIn: true });
        },
        logout: () => {
            this.setState({ isLoggedIn: false });
        }
    };

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Provider>
                    <Router>
                        <React.Fragment>
                            {/* Below I am passing the context state into the Navbar component*/}
                            <Context.Consumer>
                                {context => (
                                    <div>
                                        <Navbar
                                            isLoggedIn={context.isLoggedIn}
                                            name={context.username}
                                        />
                                    </div>
                                )}
                            </Context.Consumer>

                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/index.html' component={Home} />
                                <Route path='/browse' component={Browse} />
                                <Route path='/cart' component={Cart} />
                                <Route path='/login' component={Login} />
                                <Route
                                    path='/signUp'
                                    component={ApplicationForm}
                                />
                                <Route
                                    path='/profile'
                                    component={ProfilePage}
                                />
                            </Switch>
                        </React.Fragment>
                    </Router>
                </Provider>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
