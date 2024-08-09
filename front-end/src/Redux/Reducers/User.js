import {
  USER_LOGIN_REQ,
  USER_LOGIN_REQ_SUCCESS,
  USER_LOGIN_REQ_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQ,
  USER_REGISTER_REQ_SUCCESS,
  USER_REGISTER_REQ_FAIL,
  USER_FORGOT_PASSWORD_REQ,
  USER_FORGOT_PASSWORD_REQ_SUCCESS,
  USER_FORGOT_PASSWORD_REQ_FAIL,
  USER_RESET_PASSWORD_REQ,
  USER_RESET_PASSWORD_REQ_SUCCESS,
  USER_RESET_PASSWORD_REQ_FAIL,
  USER_RESET_MESSAGES,
} from "../Constants/User";

//user login

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQ:
      return { loading: true };
    case USER_LOGIN_REQ_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_REQ_FAIL:
      return { loading: false, error: action.payload };

    case USER_RESET_MESSAGES: // Réinitialiser tous les messages
      return { ...state, error: "", successMessage: "" };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
//user register

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQ:
      return { loading: true };
    case USER_REGISTER_REQ_SUCCESS:
      return { loading: false, successMessage: action.payload };
    case USER_REGISTER_REQ_FAIL:
      return { loading: false, error: action.payload };
    case USER_RESET_MESSAGES: // Réinitialiser tous les messages
      return { ...state, error: "", successMessage: "" };
    default:
      return state;
  }
};

// user forgot password
export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQ:
      return { loading: true };
    case USER_FORGOT_PASSWORD_REQ_SUCCESS:
      return { loading: false, successMessage: action.payload };
    case USER_FORGOT_PASSWORD_REQ_FAIL:
      return { loading: false, error: action.payload };
    case USER_RESET_MESSAGES: // Réinitialiser tous les messages
      return { ...state, error: "", successMessage: "" };
    default:
      return state;
  }
};

// user reset password
export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQ:
      return { loading: true };
    case USER_RESET_PASSWORD_REQ_SUCCESS:
      return { loading: false, successMessage: action.payload };
    case USER_RESET_PASSWORD_REQ_FAIL:
      return { loading: false, error: action.payload };
    case USER_RESET_MESSAGES: // Réinitialiser tous les messages
      return { ...state, error: "", successMessage: "" };
    default:
      return state;
  }
};
