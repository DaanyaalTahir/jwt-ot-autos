import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from "./types";

export const loginUser = (data) => {
  return {
    type: USER_LOGIN,
    payload: {
      username: data.username,
      email: data.email,
      id: data.id,
    },
  };
};

export const userSignup = (data) => {
  return {
    type: USER_SIGNUP,
    payload: {
      userName: data.name,
      email: data.email,
      password: data.password,
    },
  };
};

export const userSignOut = (data) => {
  return {
    type: USER_LOGOUT,
    payload: {},
  };
};
