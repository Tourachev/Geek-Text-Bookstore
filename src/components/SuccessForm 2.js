import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Header from "./Header";

export class SuccessForm extends Component {
    //GO to the next Page
    continue = e => {
        e.preventDefault();
        //the backend goes here
        this.props.nextStep();
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    render() {
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <div className='sign-in-body container'>
                        <h1 className='display-4'>
                            Thank you for your Submission
                        </h1>
                    </div>
                    <Footer />
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default SuccessForm;
