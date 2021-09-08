import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_AUTH_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from "../actions/auth-actions/types";

const INITIAL_STATE = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
  userID: 0,
  users: [],
  token: null,
  resetPasswordtoken: null,
};

export const authReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        userID : action.payload.id,
        isAuthenticated : true,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isAuthenticated : false,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user : action.payload.user,
        token : action.payload.token,
        isAuthenticated : true,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated : false,
      };
    case GET_AUTH_REQUEST:
      return {
        ...state,
        isLoading : true,
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        user : action.payload,
        isLoading : false,
        isAuthenticated : true,
      };
    case GET_AUTH_FAILURE:
      return {
        ...state,
        isLoading : false,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordtoken: action.payload.resetPasswordToken,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};




