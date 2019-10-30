import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import './css/index.css';

import Home from './components/routes/HomePage';
import Cart from './components/routes/CartPage';
import Browse from './components/routes/BrowsePage';
import { ProfilePage } from './components/routes/ProfilePage';
import Wishlist from './components/routes/WishlistPage';

import Login from './components/Login';
import Navbar from './components/NavBar';
import ApplicationForm from './components/ApplicationForm';
import Context from './components/Context';

class Provider extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        isLoggedIn: false,
        login: () => {
            this.setState({ isLoggedIn: true });
        },
        logout: () => {
            this.setState({ isLoggedIn: false, usernmae: '' });
        },
        setUsername: name => {
            this.setState({ username: name });
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
                                <Route path='/login' component={Login} />
                                <Route
                                    path='/signUp'
                                    component={ApplicationForm}
                                />
                                {/* Below I am passing the context state into the Profile component*/}
                                <Context.Consumer>
                                    {context => (
                                        <div>
                                            <Route
                                                path='/profile'
                                                component={() => (
                                                    <ProfilePage
                                                        isLoggedIn={
                                                            context.isLoggedIn
                                                        }
                                                    />
                                                )}
                                            />

                                            <Route
                                                path='/wishlist'
                                                component={() => (
                                                    <Wishlist
                                                        isLoggedIn={
                                                            context.isLoggedIn
                                                        }
                                                        username={
                                                            context.username
                                                        }
                                                    />
                                                )}
                                            />

                                            <Route
                                                path='/cart'
                                                component={() => (
                                                    <Cart
                                                        isLoggedIn={
                                                            context.isLoggedIn
                                                        }
                                                        username={
                                                            context.username
                                                        }
                                                    />
                                                )}
                                            />
                                        </div>
                                    )}
                                </Context.Consumer>
                            </Switch>
                        </React.Fragment>
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default Provider;

ReactDOM.render(<App />, document.getElementById('root'));
