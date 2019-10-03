import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './components/routes/HomePage';
import Cart from './components/routes/CartPage';
import Browse from './components/routes/BrowsePage';
import Navbar from './components/NavBar';
import Profile from './components/routes/ProfilePage';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import './css/index.css';
import Login from './components/Login';
import ApplicationForm from './components/ApplicationForm';
// import ValidationLoginForm from './components/ValidatedLoginForm';
// import { Home } from './Home/Home';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path='/' component={Home} />
                        <Route path='/index.html' component={Home} />
                        <Route path='/browse' component={Browse} />
                        <Route path='/cart' component={Cart} />
                        <Route path='/login' component={Login} />
                        <Route path='/signUp' component={ApplicationForm} />
                        <Route path='/profile' component={Profile} />
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
