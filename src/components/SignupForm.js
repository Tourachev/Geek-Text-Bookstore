import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

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
          <AppBar title="Enter user Details" />
          <TextField
            hintText="Enter your first Name"
            floatingLabelText="first Name"
            onChange={handleChange("FirstName")}
            defaultValue={values.FirstName}
          />
          <br />
          <TextField
            hintText="Enter your Last Name"
            floatingLabelText="Last Name"
            onChange={handleChange("LastName")}
            defaultValue={values.LastName}
          />
          <br />
          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            onChange={handleChange("Email")}
            defaultValue={values.Email}
          />
          <br />
          <TextField
            hintText="Enter your Username"
            floatingLabelText="UserName"
            onChange={handleChange("UserName")}
            defaultValue={values.UserName}
          />
          <br />
          <TextField
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={handleChange("Password")}
            defaultValue={values.Password}
          />
          <br />
          <TextField
            hintText="Enter your Password Confirmation"
            floatingLabelText="Password Confirmation"
            onChange={handleChange("Password2")}
            defaultValue={values.Password2}
          />
          <br />
          <RaisedButton
            label="continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
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
