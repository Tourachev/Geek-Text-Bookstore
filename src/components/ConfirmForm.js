import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Header from "./Header";

export class ConfirmForm extends Component {
    //GO to the next Page
    continue = e => {
        e.preventDefault();
        console.log(e);
        //the backend goes here
        this.props.nextStep();
    };

    // Go back to prev step
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    validate = e => {
        e.preventDefault();
        fetch("/registration", {
            method: "post",
            body: JSON.stringify(this.props),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(json => {
                if (json.result === 3) {
                    this.props.nextStep(); //account created
                } else if (json.result == 2) {
                    //email taken
                } else {
                    this.props.prevStep(); //username taken
                }
            });
    };

    render() {
        const {
            values: {
                FirstName,
                LastName,
                Email,
                Address,
                City,
                State,
                UserName,
                NickName
            }
        } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <h1 className='display-4  container'>
                        Please Review All Data
                    </h1>

                    <div className=' sign-in-body container'>
                        <List>
                            <ListItem
                                primaryText='First Name'
                                secondaryText={FirstName}
                            />
                            <ListItem
                                primaryText='Last Name'
                                secondaryText={LastName}
                            />
                            <ListItem
                                primaryText='Email'
                                secondaryText={Email}
                            />
                            <ListItem
                                primaryText='Username'
                                secondaryText={UserName}
                            />
                            {/* <ListItem
                                primaryText='Nickname'
                                secondaryText={NickName}
                            /> */}
                            <ListItem
                                primaryText='Address'
                                secondaryText={Address}
                            />
                            <ListItem primaryText='City' secondaryText={City} />
                            <ListItem
                                primaryText='State'
                                secondaryText={State}
                            />
                        </List>
                        <div className='sign-up-bottom-row'>
                            <button
                                type='button'
                                class='btn btn-secondary btn-lg'
                                label='Back'
                                primary={true}
                                style={styles.button}
                                onClick={this.back}
                            >
                                BACK
                            </button>
                            <button
                                type='button'
                                class='btn btn-secondary btn-lg'
                                label='Confirm & Continue'
                                primary={true}
                                style={styles.button}
                                onClick={this.validate}
                            >
                                CONTINUE
                            </button>
                        </div>
                    </div>
                    <Footer />
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    button: {
        margin: 20
    }
};

export default ConfirmForm;
