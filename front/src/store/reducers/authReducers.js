import * as types from "../../types/auth";

const initState = {
  isAuthenticated: false,
  token: "",
  isLoading: false,
  errors: "",
};

const authReducers = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };

    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export default authReducers;
