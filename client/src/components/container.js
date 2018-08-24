import React from "react";
import auth from "../auth";
import PrivateRoute from "./privateRoute";
import { Route, Switch } from "react-router-dom";
import { Login } from "./login";
import Dashboard from "./dashboard";
import Register from "./register";
import { Redirect } from "react-router-dom";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logOut: false
    };
  }

  render() {
    if (this.state.logOut) {
      return <Redirect to="/login" />;
    }
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    );
  }
}
export default Container;
