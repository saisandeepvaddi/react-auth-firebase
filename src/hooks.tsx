import * as firebase from "firebase/app";
// import { EmailProvider } from "./providers/email";
import { useState, useEffect } from "react";
import { initialize } from "./firebase";

export const useFirebaseAuth = (configOrProject: Object | firebase.app.App) => {
  initialize(configOrProject);
  // const emailProvider = new EmailProvider();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log("user:", user);
      setUser(user);
    });
  }, []);

  const signOut = () => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
  };

  const signInWithEmail = (email: string, password: string) => {
    try {
      // emailProvider.signInWithEmail(email, password);
      firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("signInWithEmail error:", error);
      setError(error);
    }
  };

  const signUpWithEmail = (email: string, password: string) => {
    try {
      // emailProvider.signUpWithEmail(email, password);
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("signUpWithEmail error:", error);
      setError(error);
    }
  };

  return {
    user,
    error,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
};
