import {
  validateEmail,
  registerUserInDataBase,
  changeVerificationStatus
} from "./utils";
// import React from "react";

export const signInWithEmail = (email, password, firebase, stateSetter) => {
  if (!firebase.auth().currentUser) {
    if (!validateEmail(email)) {
      stateSetter({
        error: {
          message: "Invalid Email"
        }
      });
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(`${error}`);
        stateSetter({
          error
        });
      });
  } else {
    console.log(`User already signed in`);
  }
};

export const signUpWithEmail = (
  email,
  password,
  emailConfig,
  firebase,
  stateSetter
) => {
  if (!validateEmail(email)) {
    stateSetter({
      error: {
        message: "Invalid Email Format"
      }
    });
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      if (emailConfig.saveUserInDatabase) {
        // console.log(user);
        registerUserInDataBase(user, firebase);
      }

      if (emailConfig.verifyOnSignup) {
        user.sendEmailVerification().then(() => {
          console.log("Email Verification Sent!");
          // changeVerificationStatus(user, firebase);
        });
      }
    })
    .catch(error => {
      stateSetter({ error });
      return;
    });
};
