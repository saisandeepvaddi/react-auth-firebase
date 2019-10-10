import { getFakeUsers } from "./utils";
import { renderHook, act } from "@testing-library/react-hooks";
import { useFirebaseAuth } from "../src/hooks";

const config = {
  apiKey: "AIzaSyDS1uhpHa0svJOtqSay67WAtT4Cbn9qLls",
  authDomain: "react-auth-firebase-593c8.firebaseapp.com",
  databaseURL: "https://react-auth-firebase-593c8.firebaseio.com",
  projectId: "react-auth-firebase-593c8",
  storageBucket: "react-auth-firebase-593c8.appspot.com",
  messagingSenderId: "992705895311",
};

describe("it tests hooks", () => {
  it("Creates user with email, password", async () => {
    const { email, password } = getFakeUsers()[0];
    const { result } = renderHook(() => useFirebaseAuth(config));

    console.log("email, password:", email, password);

    await act(async () => {
      await result.current.signUpWithEmail(email, password);
      // await result.current.signInWithEmail(email, password);
    });

    console.log("result.current.user:", result.current.user);
    expect(result.current.user).not.toBeNull();
  });
});
