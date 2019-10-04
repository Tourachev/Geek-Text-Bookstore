import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Navbar from './NavBar';
import Footer from './Footer';

import PropTypes from 'prop-types';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    // static PropTypes = {
    //     login: PropTypes.func.isRequired,
    //     isAuthenticated: PropTypes.bool
    // };

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
            headers: {"Content-Type": 'application/json'},
        })
        .then(res => res.json)
        .then(json => {
            if (json.result === 3) {
                //success
            }
            else if (json.result === 2) {
                //wrong password
            }
            else if (json.result === 1) {
                //username does not exist
            }
        })
    };

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <Navbar />
                <div className='container tall-body'>
                    <br />
                    <h1 className='display-4'>Sign In:</h1>
                    <hr />
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
                        </Button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}
