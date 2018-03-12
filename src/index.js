import React, { Component } from "react";

const withFirebaseAuth = (WrappedComponent, firebase, config) => {
  // Validate config
  // Check for /users at firebase
  // Add firebase methods

  return class extends Component {
    constructor(props) {
      super(props);
      this.signInWithEmail = this.signInWithEmail.bind(this);
      this.signOut = this.signOut.bind(this);
      this.signUp = this.signUp.bind(this);
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

    render() {
      const newProps = {};
      if (config.types.includes("email")) {
        newProps["signInWithEmail"] = this.signInWithEmail;
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
