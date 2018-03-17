import React, { Component } from "react";
import * as utils from "./utils";
import * as emailUtils from "./email";
import * as oAuthUtils from "./oauth";

const withFirebaseAuth = (WrappedComponent, firebase, config) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.signInWithEmail = this.signInWithEmail.bind(this);
      this.signUpWithEmail = this.signUpWithEmail.bind(this);
      this.signInWithGoogle = this.signInWithGoogle.bind(this);
      this.signInWithFacebook = this.signInWithFacebook.bind(this);
      this.signInWithGithub = this.signInWithGithub.bind(this);
      this.signInWithTwitter = this.signInWithTwitter.bind(this);
      this.stateSetter = this.stateSetter.bind(this);
      this.signOut = this.signOut.bind(this);
      this.state = {
        user: null,
        error: null,
        googleAccessToken: null,
        facebookAccessToken: null,
        githubAccessToken: null,
        twitterAccessToken: null,
        twitterSecret: null
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
      oAuthUtils.signInWithOAuth.call(
        this,
        firebase,
        this.googleProvider,
        "google",
        config.google,
        this.stateSetter
      );
    }

    signInWithFacebook() {
      utils.setSignInMethod("facebook");
      oAuthUtils.signInWithOAuth.call(
        this,
        firebase,
        this.facebookProvider,
        "facebook",
        config.facebook,
        this.stateSetter
      );
    }

    signInWithGithub() {
      utils.setSignInMethod("github");
      oAuthUtils.signInWithOAuth.call(
        this,
        firebase,
        this.githubProvider,
        "github",
        config.github,
        this.stateSetter
      );
    }

    signInWithTwitter() {
      utils.setSignInMethod("twitter");
      oAuthUtils.signInWithOAuth.call(
        this,
        firebase,
        this.twitterProvider,
        "twitter",
        config.twitter,
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
        this.googleProvider = oAuthUtils.setProvider(
          firebase,
          config.google,
          "google"
        );
        newProps["signInWithGoogle"] = this.signInWithGoogle;
        newProps["googleAccessToken"] = this.state.googleAccessToken;
      }
      if (config.facebook) {
        this.facebookProvider = oAuthUtils.setProvider(
          firebase,
          config.facebook,
          "facebook"
        );
        newProps["signInWithFacebook"] = this.signInWithFacebook;
        newProps["facebookAccessToken"] = this.state.facebookAccessToken;
      }

      if (config.github) {
        this.githubProvider = oAuthUtils.setProvider(
          firebase,
          config.github,
          "github"
        );
        newProps["signInWithGithub"] = this.signInWithGithub;
        newProps["githubAccessToken"] = this.state.githubAccessToken;
      }

      if (config.twitter) {
        this.twitterProvider = oAuthUtils.setProvider(
          firebase,
          config.twitter,
          "twitter"
        );
        newProps["signInWithTwitter"] = this.signInWithTwitter;
        newProps["twitterAccessToken"] = this.state.twitterAccessToken;
        newProps["twitterSecret"] = this.state.twitterSecret;
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
