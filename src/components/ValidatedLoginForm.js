import React, { Component } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import * as Yup from "yup";
import "../css/Login.css";
import NavBar2 from "./NavBar2";

export class ValidatedLoginForm extends Component {
  render() {
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
            <fragment>
              <NavBar2 />
              <div className="Login">
                <form onSubmit={handleSubmit}>
                  <FormGroup controlId="email" bsSize="large">
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
                  <FormGroup controlId="password" bsSize="large">
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
                    bsSize="large"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </div>
            </fragment>
          );
        }}
      </Formik>
    );
  }
}

export default ValidatedLoginForm;
