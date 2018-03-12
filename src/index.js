import React, { Component } from "react";
import {
  validateEmail,
  registerUserInDataBase,
  changeVerificationStatus
} from "./utils";

const defaultConfig = {
  verifyOnSignup: false,
  saveUserInDatabase: true
};

const withFirebaseAuth = (
  WrappedComponent,
  firebase,
  config = defaultConfig
) => {
  // Validate config
  // Check for /users at firebase
  // Add firebase methods

  return class extends Component {
    constructor(props) {
      super(props);
      this.signInWithEmail = this.signInWithEmail.bind(this);
      this.signUpWithEmail = this.signUpWithEmail.bind(this);
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

    signOut() {
      console.log("Sign Out Called");
      if (firebase.auth().currentUser) {
        firebase
          .auth()
          .signOut()
          .then(
            function() {
              // Sign-out successful.
              this.setState(() => ({
                user: null,
                error: null
              }));
            }.bind(this)
          )
          .catch(function(error) {
            // An error happened.
          });
      } else {
        console.log(`No user signed in`);
        this.setState(() => ({
          error: {
            code: -1,
            message: "No user signed in"
          }
        }));
      }
    }
    signUp() {
      console.log("Sign Up Called");
    }

    signInWithEmail(email, password) {
      if (!firebase.auth().currentUser) {
        if (!validateEmail(email)) {
          this.setState(() => ({
            error: {
              message: "Invalid Email"
            }
          }));
          return;
        }
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch(
            function(error) {
              console.log(`${error}`);
              this.setState(() => ({
                error
              }));
            }.bind(this)
          );
      } else {
        console.log(`User already signed in`);
      }
    }

    signUpWithEmail(email, password) {
      if (!validateEmail(email)) {
        this.setState(() => ({
          error: {
            message: "Invalid Email Format"
          }
        }));
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          if (config.saveUserInDatabase) {
            // console.log(user);
            registerUserInDataBase(user, firebase);
          }

          if (config.verifyOnSignup) {
            user.sendEmailVerification().then(function() {
              console.log("Email Verification Sent!");
              // changeVerificationStatus(user, firebase);
            });
          }
        })
        .catch(
          function(error) {
            this.setState(() => ({
              error
            }));
            return;
          }.bind(this)
        );
    }

    render() {
      const newProps = {};
      if (config.types.includes("email")) {
        newProps["signInWithEmail"] = this.signInWithEmail;
        newProps["signUpWithEmail"] = this.signUpWithEmail;
      }
      return (
        <WrappedComponent
          {...newProps}
          signOut={this.signOut}
          signUp={this.signUp}
          user={this.state.user}
          error={this.state.error}
          {...this.props}
        />
      );
    }
  };
};

export default withFirebaseAuth;
