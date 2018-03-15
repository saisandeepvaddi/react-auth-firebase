export const validateEmail = email => {
  const isValidEmail = require("validator/lib/isEmail")(email);
  return isValidEmail;
};

export const registerUserInDataBase = (user, firebase) => {
  const database = firebase.database();
  const usersRef = database.ref("/users");
  const userRef = usersRef.child(user.uid);
  userRef.once("value").then(snapshot => {
    if (snapshot.val()) return;
    const {
      uid,
      displayName,
      photoURL,
      email,
      emailVerified,
      phoneNumber,
      isAnonymous
    } = user;
    const userData = {
      uid,
      displayName,
      photoURL,
      email,
      emailVerified,
      phoneNumber,
      isAnonymous
    };
    userRef.set(userData);
  });
};

export const signOut = (firebase, stateSetter) => {
  console.log("Signing out");
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.

        stateSetter({
          user: null,
          error: null
        });
      })
      .catch(error => {
        // An error happened.
        stateSetter(error);
      });
  } else {
    console.log(`No user signed in`);

    stateSetter({
      error: {
        code: -1,
        message: "No user signed in"
      }
    });
  }
};

export const changeVerificationStatus = (user, firebase) => {
  const database = firebase.database();
  const usersRef = database.ref("/users");
  const userRef = usersRef.child(user.uid);
  userRef.once("value").then(snapshot => {
    if (!snapshot.val()) {
      console.log("User doesn't exist in database");
    }
    userRef.update({
      emailVerified: true
    });
  });
};
