import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { EditorFormatAlignCenter } from "material-ui/svg-icons";

export class PersonalInfo extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Personal Details" />
          <TextField
            hintText="Enter your Address"
            floatingLabelText="Address"
            onChange={handleChange("Address")}
            defaultValue={values.Address}
          />
          <br />
          <TextField
            hintText="Enter your City"
            floatingLabelText="Last City"
            onChange={handleChange("City")}
            defaultValue={values.City}
          />
          <br />
          <TextField
            hintText="Enter your State"
            floatingLabelText="State"
            onChange={handleChange("State")}
            defaultValue={values.State}
          />
          <br />
          <RaisedButton
            label="continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <br />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
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

export default PersonalInfo;
