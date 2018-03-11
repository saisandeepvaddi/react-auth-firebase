import React, { Component } from "react";

const withFirebaseAuth = (WrappedComponent, config) => {
  // Validate config
  // Check for /users at firebase
  // Add firebase methods

  // Return HOC
  if (!config) {
    console.error("Firebase config file is not passed to withFirebaseAuth()");
    console.warn("usage: withFirebaseAuth(Component, firebaseConfig)");
  }
  if (JSON.stringify(config) === JSON.stringify({})) {
    console.error("Empty firebase config file");
  }

  console.log(config);

  return class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withFirebaseAuth;
