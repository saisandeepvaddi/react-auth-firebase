import { registerUserInDataBase } from "./utils";

export const setGoogleProvider = (firebase, config) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  if (config.customParams) {
    provider.setCustomParameters(config.customParams);
  }
  if (config.scopes && config.scopes.length > 0) {
    config.scopes.forEach(scope => {
      provider.addScope(`https://www.googleapis.com/auth/${scope}`);
    });
  }
  return provider;
};

export const signInWithGoogle = (firebase, provider, config, stateSetter) => {
  if (firebase.auth().currentUser) {
    console.log(`Already a user logged in`);
    alert(`Already a user logged in`);
    return;
  }
  // If redirect is true
  if (config.redirect) {
    firebase
      .auth()
      .signInWithRedirect(provider)
      .catch(error => {
        stateSetter({
          error
        }); // ...
      });

    return;
  }

  // default is via pop up
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (config.saveUserInDatabase) {
        registerUserInDataBase(user, firebase);
      }
      if (config.returnAccessToken) {
        stateSetter({
          googleAccessToken: token
        });
      }
    })
    .catch(error => {
      stateSetter({
        error
      }); // ...
    });
};

export const googleAfterRedirection = (firebase, config, stateSetter) => {
  firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (config.saveUserInDatabase) {
        registerUserInDataBase(user, firebase);
      }
      if (config.returnAccessToken) {
        stateSetter({
          googleAccessToken: token
        });
      }
      stateSetter({
        googleRedirectEnabled: false
      });
    })
    .catch(error => {
      stateSetter({
        error
      });
    });
};
