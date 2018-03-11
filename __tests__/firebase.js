import firebase from "firebase";

export const config = {
  apiKey: "AIzaSyDS1uhpHa0svJOtqSay67WAtT4Cbn9qLls",
  authDomain: "react-auth-firebase-593c8.firebaseapp.com",
  databaseURL: "https://react-auth-firebase-593c8.firebaseio.com",
  projectId: "react-auth-firebase-593c8",
  storageBucket: "react-auth-firebase-593c8.appspot.com",
  messagingSenderId: "992705895311"
};

firebase.initializeApp(config);

export default firebase;
