import { registerUserInDataBase } from "./utils";

export const setFacebookProvider = (firebase, config) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  if (config.customParams) {
    provider.setCustomParameters(config.customParams);
  }
  if (config.scopes && config.scopes.length > 0) {
    config.scopes.forEach(scope => {
      provider.addScope(scope);
    });
  }
  return provider;
};

export const signInWithFacebook = (firebase, provider, config, stateSetter) => {
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
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (config.saveUserInDatabase) {
        registerUserInDataBase(user, firebase);
      }
      if (config.returnAccessToken) {
        stateSetter({
          facebookAccessToken: token
        });
      }
    })
    .catch(error => {
      stateSetter({
        error
      }); // ...
    });
};

export const facebookAfterRedirection = (firebase, config, stateSetter) => {
  firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (config.saveUserInDatabase) {
        registerUserInDataBase(user, firebase);
      }
      if (config.returnAccessToken) {
        stateSetter({
          facebookAccessToken: token
        });
      }
    })
    .catch(error => {
      stateSetter({
        error
      });
    });
};
