import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, CONNECT_USER_REQUEST, CONNECT_USER_SUCCESS, CONNECT_USER_FAILURE, GET_AUTH_REQUEST, GET_AUTH_SUCCESS, GET_AUTH_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from "./types";
import AuthServices from "./services";
import { toast } from 'react-toastify';
toast.configure();

// Register new user
export const signupUser = (values) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
      const response = await AuthServices.registerUser(values);
      if (response.data.DuplicateAlert) {
        dispatch({
          type: REGISTER_USER_FAILURE,
        })
        toast.error("Cette adresse Email est déja utilisée sur un autre compte!", {
          position: toast.POSITION.TOP_LEFT
        });
      } else {
        dispatch({ type: REGISTER_USER_SUCCESS, payload: { message: "User added successfully!", id: response.data.insertId } });
        dispatch(signinUser(values));
        return response.data.insertId;
      }
    } catch (e) {
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: e.response.data
      })
    }
  };
}

// Register new user
export function signinUser(values) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
      const response = await AuthServices.loginUser(values);
      if (response.data.user) {

        toast.success("Bienvenue chez LinkD!", {
          position: toast.POSITION.TOP_LEFT
        });
        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
        localStorage.setItem("LinkD", response.data.token);
        localStorage.setItem("user_id", response.data.user.user_id);
        dispatch(getAuthUser(response.data.user.user_id));
      } else {
        if (response.data === "Please verify your email adress") {
          toast.error("Veuillez vérifier votre adresse Email SVP!", {
            position: toast.POSITION.TOP_LEFT
          });
        } else if (response.data === "Please verify your password") {
          toast.error("Veuillez vérifier votre mot de passe SVP!", {
            position: toast.POSITION.TOP_LEFT
          });
        } else {
          toast.error("Error!", {
            position: toast.POSITION.TOP_LEFT
          });
        }
      }
    } catch (e) {
      dispatch({
        type: LOGIN_USER_FAILURE,
      })
    }
  };
}

export function connectUser(token) {
  return async (dispatch) => {
    localStorage.setItem("LinkD", token);
    dispatch({
      type: CONNECT_USER_REQUEST,
    });
    try {
      dispatch({
        type: CONNECT_USER_SUCCESS,
        payload: {
          token: token,
        },
      });
    } catch (e) {
      dispatch({
        type: CONNECT_USER_FAILURE,
        payload: e.response.data
      })
    }
  };
}

export function getAuthUser(user_id) {
  return async (dispatch) => {
    await dispatch({
      type: GET_AUTH_REQUEST,
    });
    try {
      const response = await AuthServices.getAuthUserRequest(user_id);
      await dispatch({
        type: GET_AUTH_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: GET_AUTH_FAILURE,
      });
    }
  };
}

export function logoutAuthUser() {
  return async (dispatch) => {
    await dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    try {
      const response = await AuthServices.logoutUser();
      localStorage.clear();
      await dispatch({
        type: LOGOUT_USER_SUCCESS,
        payload: response.data.message
      });
      window.location.reload()
    } catch (e) {
      dispatch({
        type: LOGOUT_USER_FAILURE,
      });
    }
  };
}

// Update user profile
export function updateUserProfile(user_id, body) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
    try {
      const response = await AuthServices.updateUserProfileRequest(user_id, body);
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: response.data });
        window.location.reload();
    } catch (e) {
      dispatch({
        type: UPDATE_USER_PROFILE_FAILURE,
      })
    }
  };
}

export function forgotPasswordUser(user_email) {
  return async (dispatch) => {
    await dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    try {
      const response = await AuthServices.forgotPassword(user_email);
      if (response.data.alert) {
        toast.error("Cette adresse Email est incorrecte!", {
          position: toast.POSITION.TOP_LEFT
        });
      } else {
        toast.info("Verifier votre boite Gmail SVP!", {
          position: toast.POSITION.TOP_LEFT
        });
        await dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: response.data
        });
      }
    } catch (e) {
      dispatch({
        type: FORGOT_PASSWORD_FAILURE,
        payload: e.response.data
      });
    }
  };
}

export function resetPasswordUser(user_password, resetPasswordToken) {
  return async (dispatch) => {
    await dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    try {
      const response = await AuthServices.resetPassword(user_password, resetPasswordToken);
      // User credentials 
      let values = {
        user_email : response.data.user.user_email,
        user_password : response.data.user.user_password
      }
        await dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: response.data
        });
        dispatch(signinUser(values));
    } catch (e) {
      dispatch({
        type: RESET_PASSWORD_FAILURE,
      });
    }
  };
}






