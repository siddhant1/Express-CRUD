import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import PrivateRoute from "./privateRoute";

class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
