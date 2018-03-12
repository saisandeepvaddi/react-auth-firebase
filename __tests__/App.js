import React, { Component } from "react";
import withFirebaseAuth from "../dist";
import firebase, { config as firebaseConfig } from "./firebase";

const email = "test@test.com";
const password = "password";

class App extends Component {
  render() {
    console.log(this.props);

    const { signInWithEmail, signOut, signUp, user, error } = this.props;
    return (
      <div>
        <button onClick={signOut}>SignOut</button>
        <button onClick={() => signInWithEmail(email, password)}>SignIn</button>
        {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : null}
        {error ? <h1>{error.message}</h1> : null}
      </div>
    );
  }
}

const authConfig = {
  types: ["email"]
};

// export default App;
export default withFirebaseAuth(App, firebase, authConfig);
