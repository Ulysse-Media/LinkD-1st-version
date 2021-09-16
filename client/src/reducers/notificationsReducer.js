import { FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_REQUEST, FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_SUCCESS, FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_FAILURE, FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_REQUEST, FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_SUCCESS, FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_FAILURE, FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_REQUEST, FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_SUCCESS, FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_FAILURE, FETCH_NOTIFICATIONS_BY_MED_SUPERVISOR_REQUEST, FETCH_NOTIFICATIONS_BY_MED_SUPERVISOR_SUCCESS, FETCH_NOTIFICATIONS_BY_MED_SUPERVISOR_FAILURE } from "../actions/notifications-actions/types";

const INITIAL_STATE = {
  notifications_VM_supervisor: [],
  notifications_DSM_supervisor: [],
  notifications_CDP_supervisor: [],
  notifications_MED_supervisor: [],
};

export const notificationsReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch notifications by VM supervisor request
    case FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_REQUEST:
      return { 
        ...state,
      };
    // Fetch notifications by VM supervisor success
    case FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_SUCCESS:
      return { 
        ...state,
        notifications_VM_supervisor: [...action.payload],
      };
    // Fetch notifications by VM supervisor failure
    case FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_FAILURE:
      return {
        ...state,
      };
    // Fetch notifications by DSM supervisor request
    case FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_REQUEST:
      return { 
        ...state,
      };
    // Fetch notifications by DSM supervisor success
    case FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_SUCCESS:
      return { 
        ...state,
        notifications_DSM_supervisor: [...action.payload],
      };
    // Fetch notifications by DSM supervisor failure
    case FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_FAILURE:
      return {
        ...state,
      };
    // Fetch notifications by CDP supervisor request
    case FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_REQUEST:
      return { 
        ...state,
      };
    // Fetch notifications by CDP supervisor success
    case FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_SUCCESS:
      return { 
        ...state,
        notifications_CDP_supervisor: [...action.payload],
      };
    // Fetch notifications by CDP supervisor failure
    case FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_FAILURE:
      return {
        ...state,
      };
    // Fetch notifications by MED supervisor request
    case FETCH_NOTIFICATIONS_BY_MED_SUPERVISOR_REQUEST:
      return { 
        ...state,
      };
    // Fetch notifications by MED supervisor success
    case FETCH_NOTIFICATIONS_BY_MED_SUPERVISOR_SUCCESS:
      return { 
        ...state,
        notifications_MED_supervisor: [...action.payload],
      };
    // Fetch notifications by MED supervisor failure
    case FETCH_NOTIFICATIONS_BY_MED_SUPERVISOR_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};



