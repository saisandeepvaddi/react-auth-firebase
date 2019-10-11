import { build, fake } from "test-data-bot";

export const getFakeUsers = (n: number = 1) => {
  let users: {
    email: string;
    password: string;
  }[] = [];

  const userBuilder = build("User").fields({
    email: fake(f => f.internet.email()),
    password: fake(f => f.internet.password()),
  });

  for (let i = 0; i < n; i++) {
    const user = userBuilder();
    users.push(user);
  }

  return users;
};

export const wait = async (timeout: number = 2000) => {
  let timer = setTimeout(() => {
    clearTimeout(timer);
    Promise.resolve();
  }, timeout);
};
