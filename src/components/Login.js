import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Navbar from './NavBar';
import Footer from './Footer';

import PropTypes from 'prop-types';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
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
        this.props.login(this.state.email, this.state.password);
    };

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <Navbar />
                <div className='container tall-body'>
                    <br />
                    <h1 className='display-4'>Sign In:</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId='email' bsSize='large'>
                            <FormLabel>Username:</FormLabel>
                            <FormControl
                                type='email'
                                value={email}
                                onChange={this.handleChange}
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
