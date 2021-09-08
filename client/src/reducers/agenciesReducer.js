import { FETCH_AGENCIES_REQUEST, FETCH_AGENCIES_SUCCESS, FETCH_AGENCIES_FAILURE } from "../actions/agencies-actions/types";

const INITIAL_STATE = {
  agencies: [],
};

export const agenciesReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch agencies request
    case FETCH_AGENCIES_REQUEST:
      return { 
        ...state,
      };
    // Fetch agencies success
    case FETCH_AGENCIES_SUCCESS:
      return { 
        ...state,
        agencies: action.payload,
      };
    // Fetch agencies failure
    case FETCH_AGENCIES_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};



