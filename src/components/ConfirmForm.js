import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";
import Footer from "../components/Footer";

export class ConfirmForm extends Component {
  //GO to the next Page
  continue = e => {
    e.preventDefault();
    //the backend goes here
    this.props.nextStep();
  };

  // Go back to prev step
  back = e => {
    e.preventDefault();
    this.props.prevStep();
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
          <AppBar title="Confirm" />
          <div className="container">
            <List>
              <ListItem primaryText="First Name" secondaryText={FirstName} />
              <ListItem primaryText="Last Name" secondaryText={LastName} />
              <ListItem primaryText="Email" secondaryText={Email} />
              <ListItem primaryText="Username" secondaryText={UserName} />
              <ListItem primaryText="Nickname" secondaryText={NickName} />
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
