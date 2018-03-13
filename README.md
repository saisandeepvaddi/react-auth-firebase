# react-auth-firebase

A React package to simplify firebase authentication. All it has is a single HOC.

# NOTE

Currently only **_email_** authentication is supported. Support for other oAuth providers will be added incrementally.

# Usage

## Install

```shell
$> npm install firebase react-auth-firebase

 (or)

$> yarn add firebase react-auth-firebase
```

## Create a project at Firebase console

[Firebase Setup](https://firebase.google.com/docs/web/setup)

## Setup firebase config in your project

```javascript
//firebaseConfig.js
//

import firebase from "firebase";

// See firebase setup in above google firebase documentation
export const config = {
  apiKey: "----",
  authDomain: "----",
  databaseURL: "----",
  projectId: "----",
  storageBucket: "----",
  messagingSenderId: "----"
};

firebase.initializeApp(config);

export default firebase;
```

## Final

```javascript
//App.js
import React, { Component } from "react";
import firebase from "./firebaseConfig"; // Careful to not import from "firebase"

class App extends Component {
  render() {
    // user object will have signed in user if auth state changed
    // user will be null if not logged in

    const {
      signInWithEmail,
      signUpWithEmail,
      signOut,
      user,
      error
    } = this.props;

    const { email, password } = this.state;

    return (
      <div>
        // For Sign In
        <form onSubmit={e => e.preventDefault()}>
          ...form input to take email and password for sign in
          <button
            type="submit"
            onClick={() => signInWithEmail(email, password)}
          >
            SignIn
          </button>
        </form>
        // For Sign Up
        <form onSubmit={e => e.preventDefault()}>
          ...form input to take email and password for sign up
          <button
            type="submit"
            onClick={() => signUpWithEmail(email, password)}
          >
            SignUp
          </button>
        </form>
      </div>
    );
  }
}

// Important
const authConfig = {
  email: {
    verifyOnSignup: false,
    saveUserInDatabase: true
  }
};

// export default App;
export default withFirebaseAuth(App, firebase, authConfig);
```

# API

## withFirebaseAuth(Component, firebase, authConfig)

* returns

  * A component with methods for authentication

* arguments
  * component - A react component
  * firebase - A firebase instance which is already initialized
  * authConfig - A config object with options for authentication. See [authConfig](#authconfig) for options

## authConfig

* email

  * verifyOnSignup: boolean

    * Should send verification email upon sign up
    * default: false

  * saveUserInDatabase: boolean
    * Should user object saved in firebase database at **/user** ref
    * Only uid, displayName, photoURL, email, emailVerified, phoneNumber, isAnonymous will be saved
    * default: true

## props

* signInWithEmail: Function

  * description: method to sign in using existing credentials
  * arguments
    * email: string
    * password: string

* signUpWithEmail: Function
  * description: method to sign up new user
  * arguments
    * email: string
    * password: string

- signOut: Function

  * description: method to sign out user. _user_ object will become null
  * arguments: none

- user: Object

  * Check [documentation](https://firebase.google.com/docs/reference/js/firebase.User) for available properties.

- error: Object
  * description: Error object from firebase will be returned as is.
  * Note: some custom errors will be given in console as well.
  * Will have better control in next versions

# License

* [MIT](/LICENSE) - [Sai Sandeep Vaddi](https://twitter.com/saisandeepvaddi)
