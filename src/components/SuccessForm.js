import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

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
          <AppBar title="Success" />
          <h1>Thank you for your Submission</h1>
          <p>You will get an email!</p>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default SuccessForm;
