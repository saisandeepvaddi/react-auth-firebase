import * as firebase from "firebase";

// import { EmailProvider } from "./providers/email";
import { useState, useEffect } from "react";
import { initialize } from "./firebase";

export const useFirebaseAuth = (configOrProject: Object | firebase.app.App) => {
  initialize(configOrProject);
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let shouldUpdate = true;
    firebase.auth().onAuthStateChanged(user => {
      if (shouldUpdate) {
        setUser(user);
      }
      return () => {
        shouldUpdate = false;
      };
    });
  }, []);

  const signOut = () => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }
  };

  const signInWithEmail = (email: string, password: string) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          setError(error);
        });
    } catch (error) {
      console.log("signInWithEmail error:", error);
    }
  };

  const signUpWithEmail = (email: string, password: string) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          setError(error);
        });
    } catch (error) {
      console.log("signUpWithEmail error:", error);
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
