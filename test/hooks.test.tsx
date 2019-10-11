import { getFakeUsers } from "./utils";
import { renderHook, act } from "@testing-library/react-hooks";
import { useFirebaseAuth } from "../src/hooks";
import { mocksdk } from "./firebase-mock-setup";

const user = {
  uid: "testUid",
  provider: "custom",
  token: "authToken",
  expires: Math.floor(new Date().valueOf() / 1000) + 24 * 60 * 60,
  auth: {
    isAdmin: true,
  },
};

jest.mock("firebase", () => {
  return {
    apps: [
      {
        name: "[TEST]",
      },
    ],
    initializeApp: jest.fn(config => {
      console.log("Mock Initialized");
    }),
    auth() {
      return {
        __giveUser: jest.fn(),
        currentUser: {},
        signInWithEmailAndPassword: jest.fn((email, password) => {
          this.__giveUser(user);
        }),
        onAuthStateChanged: jest.fn(x => (this.__giveUser = x)),
        signOut: jest.fn(),
        createUserWithEmailAndPassword: jest.fn((email, password) => {
          this.__giveUser(user);
        }),
      };
    },
  };
});

const config = {
  apiKey: "AIzaSyDS1uhpHa0svJOtqSay67WAtT4Cbn9qLls",
  authDomain: "react-auth-firebase-593c8.firebaseapp.com",
  databaseURL: "https://react-auth-firebase-593c8.firebaseio.com",
  projectId: "react-auth-firebase-593c8",
  storageBucket: "react-auth-firebase-593c8.appspot.com",
  messagingSenderId: "992705895311",
};

mocksdk.auth().changeAuthState({
  uid: "testUid",
  provider: "custom",
  token: "authToken",
  expires: Math.floor(new Date().valueOf() / 1000) + 24 * 60 * 60,
  auth: {
    isAdmin: true,
  },
});
mocksdk.auth().flush();

describe("it tests hooks", () => {
  it("Creates user with email, password", async () => {
    const { email, password } = getFakeUsers()[0];
    const { result, waitForNextUpdate } = renderHook(() =>
      useFirebaseAuth(config)
    );

    console.log("email, password:", email, password);

    act(() => {
      result.current.signOut();
      result.current.signUpWithEmail(email, password);
    });

    await waitForNextUpdate();

    const {
      current: { user, error },
    } = result;
    console.log("result.current.user:", result.current.user);
    expect(error).toBeNull();
    expect(user.email.toLowerCase()).toBe(email.toLowerCase());
  });
});
