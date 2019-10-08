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

        this.handleIssue = this.handleIssue.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleIssue() {
        this.setState({ hideIssue: false });
    }

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
                } else {
                    this.handleIssue();
                }
                // } else if (json.result === 1) {
                //     this.setState({ hideIssue: false });
                //     this.forceUpdate();
                // }
            });
    };

    render() {
        const { username, password } = this.state;

        const style = this.state.hideIssue ? { display: 'none' } : {};

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
                    <h1 style={style}>
                        Username and password don't match. <br /> Please Try
                        Again.
                    </h1>
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
