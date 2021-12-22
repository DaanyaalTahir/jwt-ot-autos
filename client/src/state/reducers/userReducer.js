import { USER_LOGIN, USER_LOGOUT } from "../actions/types";

const initialState = {
  id: null,
  username: null,
  email: null,
  isLoggedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        isLoggedIn: true,
        id: action.payload.id,
      };
    case USER_LOGOUT:
      return {
        initialState,
      };
    default:
      return state;
  }
}
