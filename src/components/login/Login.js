import React, { Component } from "react";
import {
  Row,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock,
} from "react-bootstrap";
import "./login.sass";
import {
  isEmail,
  isEmpty,
  isLength,
  isContainWhiteSpace,
} from "../../shared/validator";

import API from "../../services/AuthServices";
import { Route, Redirect, Router } from "react-router-dom";
import Home from "../home/Home";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {}, // Contains login form data
      errors: {}, // Contains login field errors
      formSubmitted: false, // Indicates submit status of login form
      loading: false, // Indicates in progress state of login form
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;

    this.setState({
      formData: formData,
    });
  };

  validateLoginForm = (e) => {
    let errors = {};
    const { formData } = this.state;

    if (isEmpty(formData.email)) {
      errors.email = "Email can't be blank";
    } else if (!isEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (isEmpty(formData.password)) {
      errors.password = "Password can't be blank";
    } else if (isContainWhiteSpace(formData.password)) {
      errors.password = "Password should not contain white spaces";
    } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
      errors.password = "Password's length must between 6 to 16";
    }

    if (isEmpty(errors)) {
      return true;
    } else {
      return errors;
    }
  };

  login = (e) => {
    e.preventDefault();

    let errors = this.validateLoginForm();
    console.log(this.state.formData);

    if (errors === true) {
      API.loginWithEmailAndPassword(
        this.state.formData.email,
        this.state.formData.password
      )
        .then((res) => {
          console.log(res.data);
          alert("You are successfully signed in...");
          const { from } = this.props.location.state || {
            from: { pathname: "/home" },
          };
          this.props.history.push(from);
        })
        .catch((error) => {
          alert("Bad Credentials");
        });
    } else {
      this.setState({
        errors: errors,
        formSubmitted: true,
      });
    }
  };

  render() {
    const { errors, formSubmitted } = this.state;

    return (
      <div className="Login">
        <Row>
          <form onSubmit={this.login}>
            <FormGroup
              controlId="email"
              validationState={
                formSubmitted ? (errors.email ? "error" : "success") : null
              }
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={this.handleInputChange}
              />
              {errors.email && <HelpBlock>{errors.email}</HelpBlock>}
            </FormGroup>
            <FormGroup
              controlId="password"
              validationState={
                formSubmitted ? (errors.password ? "error" : "success") : null
              }
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={this.handleInputChange}
              />
              {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
            </FormGroup>
            <Button type="submit" bsStyle="primary">
              Sign-In
            </Button>
          </form>
        </Row>
      </div>
    );
  }
}

export default Login;
