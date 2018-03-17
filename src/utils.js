import * as oAuthUtils from "./oauth";

export const validateEmail = email => {
  const isValidEmail = require("validator/lib/isEmail")(email);
  return isValidEmail;
};

export const registerUserInDataBase = (user, firebase) => {
  const database = firebase.database();
  const usersRef = database.ref("/users");
  const userRef = usersRef.child(user.uid);
  userRef.once("value").then(snapshot => {
    if (snapshot.val()) return;
    const {
      uid,
      displayName,
      photoURL,
      email,
      emailVerified,
      phoneNumber,
      isAnonymous
    } = user;
    const userData = {
      uid,
      displayName,
      photoURL,
      email,
      emailVerified,
      phoneNumber,
      isAnonymous
    };
    userRef.set(userData);
  });
};

export const signOut = (firebase, stateSetter) => {
  console.log("Signing out");
  if (firebase.auth().currentUser) {
    const signInMethod = getSignInMethod();
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.

        stateSetter({
          user: null,
          error: null,
          [`${signInMethod}AccessToken`]: null
        });
      })
      .catch(error => {
        // An error happened.
        stateSetter(error);
      });
  } else {
    console.log(`No user signed in`);

    stateSetter({
      error: {
        code: -1,
        message: "No user signed in"
      }
    });
  }

  // Once signed out, remove sign in method from localstorage
  removeSignInMethod();
};

export const authStateChange = (firebase, config, stateSetter) => {
  const signInMethod = getSignInMethod();
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      stateSetter({
        user,
        error: null
      });

      if (
        signInMethod !== "email" &&
        config[signInMethod] &&
        config[signInMethod].redirect
      ) {
        oAuthUtils.oAuthAfterRedirection(
          firebase,
          signInMethod,
          config[signInMethod],
          stateSetter
        );
      }

      return;
    }
    // User is signed out.
    // ...
    stateSetter({
      user: null,
      error: null
    });
  });
};

export const setSignInMethod = signInMethod => {
  localStorage.setItem("signInMethod", signInMethod);
};

export const getSignInMethod = () => {
  return localStorage.getItem("signInMethod");
};

export const removeSignInMethod = () => {
  localStorage.removeItem("signInMethod");
};
