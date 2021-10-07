import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_AUTH_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, GET_CLIENT_SAME_DSM_SUPERVISOR_REQUEST, GET_CLIENT_SAME_DSM_SUPERVISOR_SUCCESS, GET_CLIENT_SAME_DSM_SUPERVISOR_FAILURE, GET_DSM_SUPERVISOR_REQUEST, GET_DSM_SUPERVISOR_SUCCESS, GET_DSM_SUPERVISOR_FAILURE, GET_CDP_SUPERVISOR_REQUEST, GET_CDP_SUPERVISOR_SUCCESS, GET_CDP_SUPERVISOR_FAILURE } from "../actions/auth-actions/types";

const INITIAL_STATE = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
  userID: 0,
  users: [],
  DSM_supervisor: {},
  CDP_supervisor: {},
  other_staff: [],
  token: null,
  resetPasswordtoken: null,
};

export const authReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // User Registration 
    case REGISTER_USER_REQUEST:
      return {
        ...state,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        userID: action.payload.id,
        isAuthenticated: true,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
      };
    // User Login
    case LOGIN_USER_REQUEST:
      return {
        ...state,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
      };
    // Fetch DSM supervisor
    case GET_DSM_SUPERVISOR_REQUEST:
      return {
        ...state,
      };
    case GET_DSM_SUPERVISOR_SUCCESS:
      return {
        ...state,
        DSM_supervisor: action.payload
      };
    case GET_DSM_SUPERVISOR_FAILURE:
      return {
        ...state,
      };
    // Fetch CDP supervisor
    case GET_CDP_SUPERVISOR_REQUEST:
      return {
        ...state,
      };
    case GET_CDP_SUPERVISOR_SUCCESS:
      return {
        ...state,
        CDP_supervisor: action.payload
      };
    case GET_CDP_SUPERVISOR_FAILURE:
      return {
        ...state,
      };
    // Fetch users with same DSM supervisors
    case GET_CLIENT_SAME_DSM_SUPERVISOR_REQUEST:
      return {
        ...state,
      };
    case GET_CLIENT_SAME_DSM_SUPERVISOR_SUCCESS:
      return {
        ...state,
        other_staff: action.payload,
      };
    case GET_CLIENT_SAME_DSM_SUPERVISOR_FAILURE:
      return {
        ...state,
      };
    // Get user authentication 
    case GET_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case GET_AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    // User logout
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
    // Forgot password
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




