import * as firebase from "firebase/app";

import "firebase/auth";

export const config = {
  apiKey: "AIzaSyDS1uhpHa0svJOtqSay67WAtT4Cbn9qLls",
  authDomain: "react-auth-firebase-593c8.firebaseapp.com",
  databaseURL: "https://react-auth-firebase-593c8.firebaseio.com",
  projectId: "react-auth-firebase-593c8",
  storageBucket: "react-auth-firebase-593c8.appspot.com",
  messagingSenderId: "992705895311",
};

export const initialize = (config: any): void => {
  if (!config) {
    throw new Error(
      "You must pass either firebase config or your custom firebase project. Check https://firebase.google.com/docs/web/setup?authuser=0#multiple-projects"
    );
  }

  let alreadyInitialized = firebase.apps.length > 0;

  if (alreadyInitialized) {
    return;
  }

  firebase.initializeApp(config);
};