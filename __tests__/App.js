import React, { Component } from "react";
import withFirebaseAuth from "../dist";
import firebase, { config as firebaseConfig } from "./firebase";

class App extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <h1>Testing</h1>
      </div>
    );
  }
}

// export default App;
export default withFirebaseAuth(App, firebaseConfig);
