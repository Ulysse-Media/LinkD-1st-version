import { FETCH_DOCTORS_REQUEST, FETCH_DOCTORS_SUCCESS, FETCH_DOCTORS_FAILURE, FETCH_DOCTORS_BY_USER_ID_REQUEST, FETCH_DOCTORS_BY_USER_ID_SUCCESS, FETCH_DOCTORS_BY_USER_ID_FAILURE, FETCH_INVITED_DOCTORS_REQUEST, FETCH_INVITED_DOCTORS_SUCCESS, FETCH_INVITED_DOCTORS_FAILURE } from "./types";
import  DoctorsServices  from "./services";

// Retrieve all doctors
export function getDoctors() {
  return async (dispatch) => {
    dispatch({type: FETCH_DOCTORS_REQUEST});
    try {
      const response = await DoctorsServices.fetchDoctors();
      dispatch({type: FETCH_DOCTORS_SUCCESS, payload: response.data});
    } catch (e) {
      dispatch({
        type: FETCH_DOCTORS_FAILURE,
      })
    }
  };
}

// Retrieve doctors by user id
export function getDoctorsByUserId(user_id) {
  return async (dispatch) => {
    dispatch({type: FETCH_DOCTORS_BY_USER_ID_REQUEST});
    try {
      const response = await DoctorsServices.fetchDoctorsByUserId(user_id);
      dispatch({type: FETCH_DOCTORS_BY_USER_ID_SUCCESS, payload: response.data});
    } catch (e) {
      dispatch({
        type: FETCH_DOCTORS_BY_USER_ID_FAILURE,
      })
    }
  };
}

// Retrieve invited doctors
export function getInvitedDoctors(doctor_fname, doctor_lname) {
  return async (dispatch) => {
    dispatch({type: FETCH_INVITED_DOCTORS_REQUEST});
    try {
      const response = await DoctorsServices.fetchInvitedDoctors(doctor_fname, doctor_lname);
      dispatch({type: FETCH_INVITED_DOCTORS_SUCCESS, payload: response.data});
    } catch (e) {
      dispatch({
        type: FETCH_INVITED_DOCTORS_FAILURE,
      })
    }
  };
}









