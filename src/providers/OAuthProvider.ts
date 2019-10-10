import firebase from "firebase";

type OAUTH_PROVIDER = "google" | "facebook" | "twitter" | "github" | "phone";

export class OAuthProvider {
  project: firebase.app.App;
  constructor(project: firebase.app.App) {
    this.project = project;
  }
  getProvider(provider: OAUTH_PROVIDER) {
    if (!provider) {
      throw new Error("You must provide an authentication provider.");
    }
    switch (provider) {
      case "google":
        return new firebase.auth.GoogleAuthProvider();
      case "facebook":
        return new firebase.auth.FacebookAuthProvider();
      case "github":
        return new firebase.auth.GithubAuthProvider();
      case "twitter":
        return new firebase.auth.TwitterAuthProvider();
      case "phone":
        return new firebase.auth.PhoneAuthProvider();
      default:
        return null;
    }
  }
}
