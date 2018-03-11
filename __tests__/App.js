import React, { Component } from "react";
import withFirebaseAuth from "../dist";
import firebase, { config as firebaseConfig } from "./firebase";

const email = "test@test.com";
const password = "password";

class App extends Component {
  render() {
    console.log(this.props);

    const { signIn, signOut, signUp, user } = this.props;
    signIn(email, password);
    return (
      <div>
        <h1>Testing</h1>
        {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : null}
      </div>
    );
  }
}

// export default App;
export default withFirebaseAuth(App, firebase);
