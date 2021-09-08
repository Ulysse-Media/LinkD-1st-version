import { FETCH_NOTES_BY_ACTION_SENDER_REQUEST, FETCH_NOTES_BY_ACTION_SENDER_SUCCESS, FETCH_NOTES_BY_ACTION_SENDER_FAILURE } from "../actions/notes-actions/types";

const INITIAL_STATE = {
  notesActionSender: [],
};

export const notesReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch notifications by VM supervisor request
    case FETCH_NOTES_BY_ACTION_SENDER_REQUEST:
      return { 
        ...state,
      };
    // Fetch notifications by VM supervisor success
    case FETCH_NOTES_BY_ACTION_SENDER_SUCCESS:
      return { 
        ...state,
        notesActionSender: [...action.payload],
      };
    // Fetch notifications by VM supervisor failure
    case FETCH_NOTES_BY_ACTION_SENDER_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};



