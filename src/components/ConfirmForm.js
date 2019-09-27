import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { EditorFormatAlignCenter } from "material-ui/svg-icons";
import { List, ListItem } from "material-ui/List";

export class ConfirmForm extends Component {
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
    const {
      values: { FirstName, LastName, Email, Address, City, State }
    } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Confirm" />
          <List>
            <ListItem primaryText="First Name" secondaryText={FirstName} />
            <ListItem primaryText="Last Name" secondaryText={LastName} />
            <ListItem primaryText="Email" secondaryText={Email} />
            <ListItem primaryText="Address" secondaryText={Address} />
            <ListItem primaryText="City" secondaryText={City} />
            <ListItem primaryText="State" secondaryText={State} />
          </List>

          <br />
          <RaisedButton
            label="Confirm & Continue"
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

export default ConfirmForm;
