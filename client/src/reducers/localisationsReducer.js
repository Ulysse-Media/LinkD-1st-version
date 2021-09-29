import { FETCH_LOCALISATIONS_REQUEST, FETCH_LOCALISATIONS_SUCCESS, FETCH_LOCALISATIONS_FAILURE } from "../actions/localisations-actions/types";

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
    default:
      return state;
  }
};



