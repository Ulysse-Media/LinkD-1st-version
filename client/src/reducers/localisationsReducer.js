import { ADD_LOCALISATION_REQUEST, ADD_LOCALISATION_SUCCESS, ADD_LOCALISATION_FAILURE, FETCH_LOCALISATIONS_REQUEST, FETCH_LOCALISATIONS_SUCCESS, FETCH_LOCALISATIONS_FAILURE } from "../actions/localisations-actions/types";

const INITIAL_STATE = {
  localisations: [],
  isLoading: false,
};

export const localisationsReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch localisations request
    case FETCH_LOCALISATIONS_REQUEST:
      return { 
        ...state,
        isLoading: true,
      };
    // Fetch localisations success
    case FETCH_LOCALISATIONS_SUCCESS:
      return { 
        ...state,
        localisations: [...action.payload],
        isLoading: false,
      };
    // Fetch localisations failure
    case FETCH_LOCALISATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    // Add localisation request
    case ADD_LOCALISATION_REQUEST:
      return {
        ...state,
      };
    // Add localisation success
    case ADD_LOCALISATION_SUCCESS:
      return {
        ...state,
        localisations: action.payload,
      };
    // Add localisation failure
    case ADD_LOCALISATION_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};



