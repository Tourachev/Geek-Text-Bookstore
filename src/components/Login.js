import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Footer from "./Footer";
import { Link, Redirect } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Context from "./Context";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            hideIssue: true,
            redirect: false,
            hideLoader: true
        };

        //Must do the bind to have the dom update on change.
        this.handleIssue = this.handleIssue.bind(this);
        this.handleLoader = this.handleLoader.bind(this);
    }

    //Handles input in form

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    //Method handles removes hidden attr from error message if input is bad.

    handleIssue() {
        this.setState({ hideIssue: false });
    }

    handleLoader() {
        this.setState({ hideLoader: false });
    }

    //Handles the submit being clicked. Returns 3 for good. 2 and 1 for bad...

    handleSubmit = event => {
        this.setState({ hideLoader: false });
        event.preventDefault();
        fetch("/auth", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(json => {
                if (json.result === 3) {
                    this.setState({
                        redirect: true,
                        hideLoader: true
                    });
                } else {
                    this.setState({ hideLoader: true });
                    this.handleIssue();
                }
                // else if (json.result == 2) {
                //     this.setState({ hideLoader: true });
                //     this.handleIssue();
                // } else if (json.result === 1) {
                //     this.setState({ hideLoader: true });
                //     this.handleIssue();
                // }
            });
    };

    render() {
        const { username, password } = this.state;
        const issueStyle = this.state.hideIssue ? { display: "none" } : {};
        const loaderStyle = this.state.hideLoader ? { display: "none" } : {};

        if (this.state.redirect) {
            return (
                <Context.Consumer>
                    {context => (
                        <Redirect
                            push
                            to={{
                                pathname: "/profile",
                                state: { username: context.username }
                            }}
                        />
                    )}
                </Context.Consumer>
            );
        }

        return (
            <div>
                <div className='container tall-body'>
                    <br />
                    <h1 className='display-4'>Login:</h1>
                    <hr />
                    <h1 style={issueStyle}>
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
                        <div style={{ width: "100%" }}>
                            <Link to='/signUp'>
                                <Button style={{ width: "47%" }}>
                                    Sign Up
                                </Button>
                            </Link>
                            {/* This is wrong but hey. Status of logged in is changed when user clicks on login button. Username is passed into context */}
                            <Context.Consumer>
                                {context => (
                                    <Button
                                        style={{
                                            width: "47%",
                                            marginLeft: "6%"
                                        }}
                                        type='submit'
                                        onClick={() => {
                                            context.login();
                                            context.setUsername(
                                                this.state.username
                                            );
                                        }}
                                    >
                                        Login
                                    </Button>
                                )}
                            </Context.Consumer>
                        </div>

                        <h1 style={loaderStyle}>
                            <LinearProgress />
                        </h1>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}
