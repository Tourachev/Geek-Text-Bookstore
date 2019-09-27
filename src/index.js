import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./components/routes/HomePage"
import Cart from "./components/routes/CartPage"
import Browse from "./components/routes/BrowsePage"
import Profile from "./components/routes/ProfilePage"

import { Route, BrowserRouter as Router } from 'react-router-dom'

import "./css/index.css";

const routes = (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/browse" component={Browse} />
        <Route path="/cart" component={Cart} />
      </div>
    </Router>
)
/*class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <Header />
                    <NavBar />
                    <Body />
                    <Footer />
                </div>
            </div>
        );
    }
}*/

ReactDOM.render(routes, document.getElementById("root"));

