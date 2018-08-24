import React from "react";
import auth from "../auth";
import { Redirect } from "react-router-dom";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  changeCredientials = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(current => {
      return {
        ...current,
        [name]: value
      };
    });
  };
  register = () => {
    fetch("api/user", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: { "content-type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        const el = `
        <div class="alert alert-success" role="alert">
           Congratulations! You are registered . Please Login
        </div>
        `;
        document.querySelector(".alert").innerHTML = el;
        setTimeout(() => {
          document.querySelector(".alert").innerHTML = "";
        }, 3000);
      })
      .catch(err => {
        const el = `
        <div class="alert alert-danger" role="alert">
           The email ID is already registered with us. Please Login
        </div>
        `;
        document.querySelector(".alert").innerHTML = el;
        setTimeout(() => {
          document.querySelector(".alert").innerHTML = "";
        }, 3000);
      });
  };
  render() {
    if (auth.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="form-group">
        <span className="alert" />
        <input
          className="form-control"
          onChange={this.changeCredientials}
          type="text"
          placeholder="Enter your name"
          name="name"
          required={true}
        />
        <input
          className="form-control"
          onChange={this.changeCredientials}
          type="text"
          placeholder="Enter your email ID"
          name="email"
          required={true}
        />
        <input
          className="form-control"
          onChange={this.changeCredientials}
          type="password"
          placeholder="Enter the password"
          name="password"
          required={true}
        />
        <button onClick={this.register} className="btn btn-info">
          Register
        </button>
      </div>
    );
  }
}
