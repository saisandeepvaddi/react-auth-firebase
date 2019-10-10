import * as firebase from "firebase/app";

export class EmailProvider {
  signUpWithEmail(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signInWithEmail(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
