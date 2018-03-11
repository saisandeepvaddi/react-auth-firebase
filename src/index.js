import React, { Component } from "react";
import firebase from "firebase";

const withFirebaseAuth = (WrappedComponent, firebase) => {
  // Validate config
  // Check for /users at firebase
  // Add firebase methods

  // Return HOC
  // if (!config) {
  //   console.error("Firebase config file is not passed to withFirebaseAuth()");
  //   console.warn("usage: withFirebaseAuth(Component, firebaseConfig)");
  // }
  // if (JSON.stringify(config) === JSON.stringify({})) {
  //   console.error("Empty firebase config file");
  // }

  return class extends Component {
    constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.signOut = this.signOut.bind(this);
      this.signUp = this.signUp.bind(this);
      this.state = {
        user: null
      };
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(
        function(user) {
          if (user) {
            this.setState(() => ({
              user
            }));
            // ...
          } else {
            // User is signed out.
            // ...
            this.setState(() => ({
              user: null
            }));
          }
        }.bind(this)
      );
    }

    signIn(email, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      console.log("Sign In Called");
    }
    signOut() {
      console.log("Sign Out Called");
    }
    signUp() {
      console.log("Sign Up Called");
    }

    render() {
      return (
        <WrappedComponent
          signIn={this.signIn}
          signOut={this.signOut}
          signUp={this.signUp}
          user={this.state.user}
          {...this.props}
        />
      );
    }
  };
};

export default withFirebaseAuth;
