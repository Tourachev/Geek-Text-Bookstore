import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Navbar from './NavBar';
import Footer from './Footer';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// var username;

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            hideIssue: true,
            redirect: false
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        fetch('/auth', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(json => {
                if (json.result === 3) {
                    // username = this.username;
                    // console.log(username);
                    this.setState({ redirect: true });
                    this.forceUpdate();
                } else if (json.result === 2) {
                    this.setState({ hideIssue: false });
                    this.forceUpdate();
                } else if (json.result === 1) {
                    this.setState({ hideIssue: false });
                    this.forceUpdate();
                }
            });
    };

    render() {
        const { username, password } = this.state;

        const style = this.state.hideIssue
            ? { display: 'none', color: 'red' }
            : {};

        if (this.state.redirect) {
            console.log(this.state.username);
            return (
                <Redirect
                    push
                    to={{
                        pathname: '/profile',
                        state: { username: this.state.username }
                    }}
                />
            );
        }

        return (
            <div>
                <Navbar />
                <div className='container tall-body'>
                    <br />
                    <h1 className='display-4'>Sign In:</h1>
                    <hr />
                    <h1 style={style}>Something went wrong</h1>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId='username' bsSize='large'>
                            <FormLabel>Username:</FormLabel>
                            <FormControl
                                value={username}
                                onChange={this.handleChange}
                                type='username'
                            />
                        </FormGroup>
                        <FormGroup controlId='password' bsSize='large'>
                            <FormLabel>Password:</FormLabel>
                            <FormControl
                                value={password}
                                onChange={this.handleChange}
                                type='password'
                            />
                        </FormGroup>

                        <Button block bsSize='large' type='submit'>
                            Login
                            {/* <Link to='/profile'>Login</Link> */}
                        </Button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}
