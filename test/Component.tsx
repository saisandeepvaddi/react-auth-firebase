import React from "react";

interface IComponentProps {
  email: string;
  password: string;
}

const Component: React.FC<IComponentProps> = ({ email, password }) => {
  return (
    <>
      <form data-testid="email-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" data-testid="email" value={email} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          data-testid="password"
          value={password}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Component;
