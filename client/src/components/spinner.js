import React from "react";
import "./spinner.css";
class Spinner extends React.Component {
  render() {
    return (
      <div className="loader">
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__bar" />
        <div className="loader__ball" />
      </div>
    );
  }
}
export default Spinner;
