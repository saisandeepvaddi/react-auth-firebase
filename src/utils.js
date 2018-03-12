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
