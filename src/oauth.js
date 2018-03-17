import { registerUserInDataBase, getSignInMethod } from "./utils";

export const setProvider = (firebase, config, providerName) => {
  let provider = null;

  switch (providerName) {
    case "google":
      provider = new firebase.auth.GoogleAuthProvider();
      break;

    case "facebook":
      provider = new firebase.auth.FacebookAuthProvider();
      break;

    case "github":
      provider = new firebase.auth.GithubAuthProvider();
      break;

    case "twitter":
      provider = new firebase.auth.TwitterAuthProvider();
      break;

    default:
      break;
  }

  if (config.customParams) {
    provider.setCustomParameters(config.customParams);
  }
  if (config.scopes && config.scopes.length > 0) {
    switch (providerName) {
      case "google": {
        config.scopes.forEach(scope => {
          provider.addScope(`https://www.googleapis.com/auth/${scope}`);
        });
        break;
      }

      case "facebook": {
        config.scopes.forEach(scope => {
          provider.addScope(scope);
        });
        break;
      }

      case "github": {
        config.scopes.forEach(scope => {
          provider.addScope(scope);
        });
        break;
      }

      default:
        break;
    }
  }
  return provider;
};

export const signInWithOAuth = (
  firebase,
  provider,
  providerName,
  config,
  stateSetter
) => {
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
      // This gives you a oAuth Provider Access Token. You can use it to access the oAuth Provider API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (config.saveUserInDatabase) {
        registerUserInDataBase(user, firebase);
      }
      if (config.returnAccessToken) {
        stateSetter({
          [`${providerName}AccessToken`]: token
        });
      }
      if (providerName === "twitter" && config.returnSecret) {
        const secret = result.credential.secret;
        stateSetter({
          twitterSecret: secret
        });
      }
    })
    .catch(error => {
      stateSetter({
        error
      }); // ...
    });
};

export const oAuthAfterRedirection = (
  firebase,
  providerName,
  config,
  stateSetter
) => {
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
          [`${providerName}AccessToken`]: token
        });
      }
      if (providerName === "twitter" && config.returnSecret) {
        const secret = result.credential.secret;
        stateSetter({
          twitterSecret: secret
        });
      }
    })
    .catch(error => {
      console.log(error);

      stateSetter({
        error
      });
    });
};
