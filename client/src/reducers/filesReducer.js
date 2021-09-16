import { RETRIEVE_FILE_REQUEST, RETRIEVE_FILE_SUCCESS, RETRIEVE_FILE_FAILURE } from "../actions/files-actions/types";

const INITIAL_STATE = {
  file: {},
};

export const filesReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch files request
    case RETRIEVE_FILE_REQUEST:
      return { 
        ...state,
        isLoading: true,
      };
    // Fetch files success
    case RETRIEVE_FILE_SUCCESS:
      return { 
        ...state,
        file: action.payload,
        isLoading: false,
      };
    // Fetch files failure
    case RETRIEVE_FILE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};



