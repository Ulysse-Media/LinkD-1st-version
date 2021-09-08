import { FETCH_DOCTORS_REQUEST, FETCH_DOCTORS_SUCCESS, FETCH_DOCTORS_FAILURE, ADD_DOCTOR_REQUEST, ADD_DOCTOR_SUCCESS, ADD_DOCTOR_FAILURE, FETCH_LAST_DOCTOR_REQUEST, FETCH_LAST_DOCTOR_SUCCESS, FETCH_LAST_DOCTOR_FAILURE, FETCH_INVITED_DOCTORS_REQUEST, FETCH_INVITED_DOCTORS_SUCCESS, FETCH_INVITED_DOCTORS_FAILURE } from "../actions/doctors-actions/types";

const INITIAL_STATE = {
  doctors: [],
  invited_doctors: [],
  lastDoctor: {},
  isLoading: false,
};

export const doctorsReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch doctors request
    case FETCH_DOCTORS_REQUEST:
      return { 
        ...state,
        isLoading: true,
      };
    // Fetch doctors success
    case FETCH_DOCTORS_SUCCESS:
      return { 
        ...state,
        doctors: [...action.payload],
        isLoading: false,
      };
    // Fetch doctors failure
    case FETCH_DOCTORS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    // Fetch invited doctors request
    case FETCH_INVITED_DOCTORS_REQUEST:
      return { 
        ...state,
        isLoading: true,
      };
    // Fetch invited doctors success
    case FETCH_INVITED_DOCTORS_SUCCESS:
      return { 
        ...state,
        invited_doctors: [...action.payload],
        isLoading: false,
      };
    // Fetch invited doctors failure
    case FETCH_INVITED_DOCTORS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    // Fetch last doctor request
    case FETCH_LAST_DOCTOR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    // Fetch last doctor success
    case FETCH_LAST_DOCTOR_SUCCESS:
      return {
        ...state,
        lastDoctor: action.payload,
        isLoading: false,
      };
    // Fetch last doctor failure
    case FETCH_LAST_DOCTOR_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    // Add doctor request
    case ADD_DOCTOR_REQUEST:
      return {
        ...state,
      };
    // Add doctor success
    case ADD_DOCTOR_SUCCESS:
      return {
        ...state,
        doctors: action.payload,
      };
    // Add doctor failure
    case ADD_DOCTOR_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};



