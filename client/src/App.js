import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "./components/container";
import { Login } from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/privateRoute";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Container />
        
      </div>
    );
  }
}

export default App;
