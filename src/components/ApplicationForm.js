import React, { Component } from "react";
import SignupForm from "./SignupForm";
import PersonalInfo from "./PersonalInfo";
import ConfirmForm from "./ConfirmForm";
import SuccessForm from "./SuccessForm";

export class ApplicationForm extends Component {
  state = {
    step: 1,
    FirstName: "",
    LastName: "",
    Email: "",
    UserName: "",
    Password: "",
    Password2: "",
    Address: "",
    City: "",
    State: ""
  };

  // Proceed to next Step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      FirstName,
      LastName,
      Email,
      Address,
      City,
      State,
      Password,
      Password2,
      UserName
    } = this.state;
    const values = {
      FirstName,
      LastName,
      Email,
      Address,
      City,
      State,
      Password,
      Password2,
      UserName
    };
    switch (step) {
      case 1:
        return (
          <SignupForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <PersonalInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <ConfirmForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <SuccessForm />;

      default:
        break;
    }
  }
}

export default ApplicationForm;
