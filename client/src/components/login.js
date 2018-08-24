import React from "react";
import auth from "../auth";
import { Redirect } from "react-router-dom";
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToDashboard: false,
      email: "",
      password: ""
    };
  }
  login = () => {
    auth.authenticate(
      {
        email: this.state.email,
        password: this.state.password
      },
      () => {
        this.setState({
          redirectToDashboard: true
        });
      },
      () => {
        const el = `
        <div class="alert alert-danger" role="alert">
           Invalid Email Id or password
        </div>
        `;
        document.querySelector(".alert").innerHTML = el;
        setTimeout(() => {
          if (document.querySelector(".alert")) {
            document.querySelector(".alert").innerHTML = "";
          }
        }, 3000);
      }
    );
  };
  changeCredentials = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(current => {
      return {
        ...current,
        [name]: value
      };
    });
  };
  render() {
    if (this.state.redirectToDashboard) {
      return <Redirect to="dashboard" />;
    }
    return (
      <div className="form-group">
        <div className="alert" />
        <input
          onChange={this.changeCredentials}
          className="form-control"
          type="text"
          name="email"
          placeholder="Enter your email"
          required
        />
        <input
          onChange={this.changeCredentials}
          className="form-control"
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <button onClick={this.login} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }
}
