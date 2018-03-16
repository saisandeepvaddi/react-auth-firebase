# react-auth-firebase

A React package to simplify firebase authentication. All it has is a single HOC.

# NOTE

Currently **_email_**, **_Google_** and **_Facebook_** authentication are supported. Support for other oAuth providers will be added incrementally.

# DEMO

See this [codesandbox](https://codesandbox.io/s/v6w6r6521y) for demo.

# Usage

## Install

```shell
$> npm install firebase react-auth-firebase

 (or)

$> yarn add firebase react-auth-firebase
```

## Create a project at Firebase console

* [Firebase Setup](https://firebase.google.com/docs/web/setup)
* Enable required authentication methods **_(email/google)_** in firebase console.

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
import withFirebaseAuth from "react-auth-firebase";

class App extends Component {
  render() {
    // user object will have signed in user if auth state changed
    // user will be null if not logged in

    const {
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      googleAccessToken,
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
        // For Sign In with Google
        <button onClick={signInWithGoogle}>Signin with Google</button>
      </div>
    );
  }
}

// Important
// See authConfig for all available options
const authConfig = {
  email: {
    verifyOnSignup: false, // Sends verification email to user upon sign up
    saveUserInDatabase: true // Saves user in database at /users ref
  },
  google: {
    // redirect: true, // Opens a pop up by default
    returnAccessToken: true, // Returns an access token as googleAccessToken prop
    saveUserInDatabase: true // Saves user in database at /users ref
  }
};

export default withFirebaseAuth(App, firebase, authConfig);
```

# API

## withFirebaseAuth(Component, firebase, authConfig)

* returns

  * A component with methods for authentication

* arguments
  * component - A react component
  * firebase - A firebase instance which is already initialized
  * authConfig - A config object with options for authentication. See [authConfig](#authconfig) for available options

## authConfig

* **email**

  * verifyOnSignup: Boolean

    * Should send verification email upon sign up ?
    * default: _false_

  * saveUserInDatabase: Boolean
    * Should user object be saved in firebase database at **/user** ref ?
    * Only uid, displayName, photoURL, email, emailVerified, phoneNumber, isAnonymous will be saved
    * default: _false_

- **google**

  **NOTE:** Make sure your domain is authorized for oAuth at Firebase console -> Authentication -> Sign-in method -> Authorized Domains

  * scopes: Array
    * **Optional** scopes to add to google provider
    * See [googlescopes](https://developers.google.com/identity/protocols/googlescopes) for reference.
    * Pass only the scope name and not entire scope url.
      * Example: ["adsense", "analytics"]

  - customParams: Object

    * **Optional** custom oAuth parameters to send with oAuth request
    * See [google custom params](https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider#setCustomParameters) for reference

  - redirect: Boolean

    * Should use redirect instead of pop-up to sign in ?
    * Will replace popup with redirect if _true_
    * default: _false_

  - returnAccessToken: Boolean

    * Should return a google access token as **_googleAccessToken_** prop ?
    * default: _false_

  - saveUserInDatabase: Boolean

    * Should user object be saved in firebase database at **/user** ref ?
    * Only uid, displayName, photoURL, email, emailVerified, phoneNumber, isAnonymous will be saved
    * default: _false_

- **facebook**

  **NOTE:** Set up facebook application at [Facebook Developers](https://developers.facebook.com) with _Facebook Login_ product enabled. Add _App ID_ and _App Secret_ from Facebook App in Firebase console. Copy the Redirect URI shown in Firebase console to Facebook App -> Products -> Facebook Login -> Valid OAuth redirect URIs

  * scopes: Array
    * **Optional** scopes to add to google provider
    * See [facebook permissions](https://developers.facebook.com/docs/facebook-login/permissions) for reference.
    * Pass only the scope name and not entire scope url.
      * Example: ["email", "public_profile"]

  - customParams: Object

    * **Optional** custom oAuth parameters to send with oAuth request
    * See [facebook custom params](https://firebase.google.com/docs/reference/js/firebase.auth.FacebookAuthProvider#setCustomParameters) for reference

  - redirect: Boolean

    * Should use redirect instead of pop-up to sign in ?
    * Will replace popup with redirect if _true_
    * default: _false_

  - returnAccessToken: Boolean

    * Should return a facebook access token as **_facebookAccessToken_** prop ?
    * default: _false_

  - saveUserInDatabase: Boolean

    * Should user object be saved in firebase database at **/user** ref ?
    * Only uid, displayName, photoURL, email, emailVerified, phoneNumber, isAnonymous will be saved
    * default: _false_

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

* signInWithGoogle: Function

  * description: method to sign in using Google oAuth
  * arguments: none

* signInWithFacebook: Function

  * description: method to sign in using Facebook oAuth
  * arguments: none

* googleAccessToken: String

  * description: Gives a google access token to access Google APIs
  * will be _null_ if returnAccessToken is false in authConfig

* facebookAccessToken: String
  * description: Gives a facebook access token to access Facebook APIs
  * will be _null_ if returnAccessToken is false in authConfig

- signOut: Function

  * description: method to sign out user. _user_ object will become null
  * arguments: none

- user: Object

  * Object with User details after sign in.
  * Check [documentation](https://firebase.google.com/docs/reference/js/firebase.User) for available properties.

* error: Object

  * description: Error object from firebase will be returned as is
  * Note: some custom errors will be given in console as well
  * Will have better control in next versions

# License

* [MIT](/LICENSE) - [Sai Sandeep Vaddi](https://twitter.com/saisandeepvaddi)
