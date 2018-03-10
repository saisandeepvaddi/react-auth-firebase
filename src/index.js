import React, { Component } from "react";

export const withFirebaseAuth = (config = {}) => WrappedComponent => {
  // Validate config
  // Check for /users at firebase
  // Add firebase methods

  // Return HOC
  return class extends Component {
    render() {
      return <WrappedComponent {...props} />;
    }
  };
};
