import React, { Component } from "react";
import * as utils from "./utils";
import * as emailUtils from "./email";
import * as googleUtils from "./google";
import * as facebookUtils from "./facebook";

const withFirebaseAuth = (WrappedComponent, firebase, config) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.signInWithEmail = this.signInWithEmail.bind(this);
      this.signUpWithEmail = this.signUpWithEmail.bind(this);
      this.signInWithGoogle = this.signInWithGoogle.bind(this);
      this.signInWithFacebook = this.signInWithFacebook.bind(this);
      this.stateSetter = this.stateSetter.bind(this);
      this.signOut = this.signOut.bind(this);
      this.googleProvider = null;
      this.state = {
        user: null,
        error: null,
        googleAccessToken: null
      };
    }

    componentDidMount() {
      utils.authStateChange.call(this, firebase, config, this.stateSetter);
    }

    stateSetter(state) {
      this.setState(() => state);
    }

    signOut() {
      utils.signOut.call(this, firebase, this.stateSetter);
    }

    signInWithEmail(email, password) {
      utils.setSignInMethod("email");
      emailUtils.signInWithEmail.call(
        this,
        email,
        password,
        firebase,
        this.stateSetter
      );
    }

    signUpWithEmail(email, password) {
      utils.setSignInMethod("email");
      emailUtils.signUpWithEmail.call(
        this,
        email,
        password,
        config.email,
        firebase,
        this.stateSetter
      );
    }

    signInWithGoogle() {
      utils.setSignInMethod("google");
      googleUtils.signInWithGoogle.call(
        this,
        firebase,
        this.googleProvider,
        config.google,
        this.stateSetter
      );
    }

    signInWithFacebook() {
      utils.setSignInMethod("facebook");
      facebookUtils.signInWithFacebook.call(
        this,
        firebase,
        this.facebookProvider,
        config.facebook,
        this.stateSetter
      );
    }

    render() {
      const newProps = {};
      if (config.email) {
        newProps["signInWithEmail"] = this.signInWithEmail;
        newProps["signUpWithEmail"] = this.signUpWithEmail;
      }
      if (config.google) {
        this.googleProvider = googleUtils.setGoogleProvider(
          firebase,
          config.google
        );
        newProps["signInWithGoogle"] = this.signInWithGoogle;
        newProps["googleAccessToken"] = this.state.googleAccessToken;
      }
      if (config.facebook) {
        this.facebookProvider = facebookUtils.setFacebookProvider(
          firebase,
          config.facebook
        );
        newProps["signInWithFacebook"] = this.signInWithFacebook;
        newProps["facebookAccessToken"] = this.state.facebookAccessToken;
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
