import React, { Component } from "react";

import * as utils from "./utils";

import * as emailUtils from "./email";

const defaultConfig = {
  verifyOnSignup: false,
  saveUserInDatabase: true
};

const withFirebaseAuth = (
  WrappedComponent,
  firebase,
  config = defaultConfig
) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.signInWithEmail = this.signInWithEmail.bind(this);
      this.signUpWithEmail = this.signUpWithEmail.bind(this);
      this.stateSetter = this.stateSetter.bind(this);
      this.signOut = this.signOut.bind(this);
      this.state = {
        user: null,
        error: null
      };
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(
        function(user) {
          if (user) {
            this.setState(() => ({
              user,
              error: null
            }));
            // ...
          } else {
            // User is signed out.
            // ...
            this.setState(() => ({
              user: null,
              error: null
            }));
          }
        }.bind(this)
      );
    }

    stateSetter(state) {
      this.setState(() => state);
    }

    signOut() {
      utils.signOut.call(this, firebase, this.stateSetter);
    }

    signInWithEmail(email, password) {
      emailUtils.signInWithEmail.call(
        this,
        email,
        password,
        firebase,
        this.stateSetter
      );
    }

    signUpWithEmail(email, password) {
      emailUtils.signUpWithEmail.call(
        this,
        email,
        password,
        config.email,
        firebase,
        this.stateSetter
      );
    }

    render() {
      const newProps = {};
      if (config.email) {
        newProps["signInWithEmail"] = this.signInWithEmail;
        newProps["signUpWithEmail"] = this.signUpWithEmail;
      }

      return (
        <WrappedComponent
          {...newProps}
          signOut={this.signOut}
          user={this.state.user}
          error={this.state.error}
          {...this.props}
        />
      );
    }
  };
};

export default withFirebaseAuth;
