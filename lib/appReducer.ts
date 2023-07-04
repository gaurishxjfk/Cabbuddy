import { UserLoginState, UserRegisterAction, UserRegisterState } from "@/Types";

export const initialState: UserRegisterState = {
    fname: {
      value: "",
      error: false,
    },
    lname: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    confirmPassword: {
      value: "",
      error: false,
    },
  };

  export const LoginInitialState: UserLoginState = {
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    }
  };

  export const reducer = (state: UserRegisterState, action: UserRegisterAction) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.field]: {
            value: action.value,
            error: action.error,
          },
        };
      default:
        return state;
    }
  };

  export const loginReducer = (state: UserLoginState, action: UserRegisterAction) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.field]: {
            value: action.value,
            error: action.error,
          },
        };
      default:
        return state;
    }
  };