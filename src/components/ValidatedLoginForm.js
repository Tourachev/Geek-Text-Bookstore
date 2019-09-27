import React, { Component } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import * as Yup from "yup";
import "../css/Login.css";
import NavBar2 from "./NavBar2";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { login } from "../actions/auth";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";

export class ValidatedLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  static propTypes = {
    login: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("Logging in", values);
            setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .required("Required.")
            .min(
              8,
              "Password is too short - should be at least 8 chars minimum."
            )
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <div>
              <NavBar2 />

              <form className="Login">
                <form onSubmit={handleSubmit}>
                  <FormGroup controlId="email" bssize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </FormGroup>
                  <FormGroup controlId="password" bssize="large">
                    <FormLabel>password</FormLabel>
                    <FormControl
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </FormGroup>
                  <Button
                    block
                    bssize="large"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </form>
              <Footer />
            </div>
          );
        }}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(ValidatedLoginForm);
