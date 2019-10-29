import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Header from "./Header";

export class SignupForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <div className='sign-in-body'>
                        <h1 className='display-4  container'>Sign Up Form</h1>

                        <div className='sign-in-form container'>
                            <div id='sign-up-left-col'>
                                <TextField
                                    className='textfield'
                                    hintText='Enter your First Name'
                                    floatingLabelText='First Name'
                                    onChange={handleChange("FirstName")}
                                    defaultValue={values.FirstName}
                                />
                                <br />
                                <TextField
                                    hintText='Enter your Last Name'
                                    floatingLabelText='Last Name'
                                    onChange={handleChange("LastName")}
                                    defaultValue={values.LastName}
                                />
                                <br />
                                <TextField
                                    hintText='Enter your Email'
                                    floatingLabelText='Email'
                                    onChange={handleChange("Email")}
                                    defaultValue={values.Email}
                                />
                                <br />
                                <TextField
                                    hintText='Enter your Username'
                                    floatingLabelText='Username'
                                    onChange={handleChange("UserName")}
                                    defaultValue={values.UserName}
                                />
                                <br />
                                <TextField
                                    hintText='Enter your Password'
                                    floatingLabelText='Password'
                                    onChange={handleChange("Password")}
                                    defaultValue={values.Password}
                                />
                            </div>
                            <div id='sign-up-right-col'>
                                <TextField
                                    hintText='Enter your Nickname'
                                    floatingLabelText='Nickname'
                                    onChange={handleChange("Nickname")}
                                    defaultValue={values.NickName}
                                />
                                <br />
                                <TextField
                                    hintText='Enter your Address'
                                    floatingLabelText='Address'
                                    onChange={handleChange("Address")}
                                    defaultValue={values.Address}
                                />
                                <br />
                                <TextField
                                    hintText='Enter your City'
                                    floatingLabelText='City'
                                    onChange={handleChange("City")}
                                    defaultValue={values.City}
                                />
                                <br />
                                <TextField
                                    hintText='Enter your State'
                                    floatingLabelText='State'
                                    onChange={handleChange("State")}
                                    defaultValue={values.State}
                                />
                                <br />
                                <TextField
                                    hintText='Confirm Entered Passoword'
                                    floatingLabelText='Password Confirmation'
                                    onChange={handleChange("Password2")}
                                    defaultValue={values.Password2}
                                />
                            </div>
                        </div>
                        <div className='container'>
                            <br />
                            <div
                                className='sign-up-bottom-row'
                                style={{ justifyContent: "end" }}
                            >
                                <button
                                    type='button'
                                    class='btn btn-secondary btn-lg'
                                    label='continue'
                                    primary={true}
                                    style={styles.button}
                                    onClick={this.continue}
                                >
                                    CONTINUE
                                </button>
                            </div>
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

export default SignupForm;
