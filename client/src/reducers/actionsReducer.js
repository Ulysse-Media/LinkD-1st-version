import { FETCH_ACTIONS_REQUEST, FETCH_ACTIONS_SUCCESS, FETCH_ACTIONS_FAILURE, ADD_ACTION_REQUEST, ADD_ACTION_SUCCESS, ADD_ACTION_FAILURE, FETCH_ACTION_BY_ID_REQUEST, FETCH_ACTION_BY_ID_SUCCESS, FETCH_ACTION_BY_ID_FAILURE, FETCH_ACTION_BY_USER_ID_REQUEST, FETCH_ACTION_BY_USER_ID_SUCCESS, FETCH_ACTION_BY_USER_ID_FAILURE, FETCH_VM_ACTIONS_BY_USER_ID_REQUEST, FETCH_VM_ACTIONS_BY_USER_ID_SUCCESS, FETCH_VM_ACTIONS_BY_USER_ID_FAILURE, FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_REQUEST, FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_FAILURE, FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_REQUEST, FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_FAILURE, FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_REQUEST, FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_FAILURE, FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_REQUEST, FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_FAILURE, FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_REQUEST, FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_SPEAKER_ACTIONS_BY_USER_ID_REQUEST, FETCH_SPEAKER_ACTIONS_BY_USER_ID_SUCCESS, FETCH_SPEAKER_ACTIONS_BY_USER_ID_FAILURE, FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_FAILURE, DELETE_ACTION_BY_ID_REQUEST, DELETE_ACTION_BY_ID_SUCCESS, DELETE_ACTION_BY_ID_FAILURE } from "../actions/actions-initiation-actions/types";

const INITIAL_STATE = {
  actions: [],
  actionsUser: [],
  VMActions: [],
  VMValidatedActions: [],
  validatedDSMActions: [],
  validatedCDPActions: [],
  rejectedDSMActions: [],
  rejectedCDPActions: [],
  speakerActions: [],
  notifications: [],
  lastAction: {},
  actionsByPosition: [],
  actionsByStatus: [],
  actionId:0,
  action: {},
  loading: false,
};

export const actionsReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch actions request
    case FETCH_ACTIONS_REQUEST:
      return { 
        ...state,
        loading: true,
      };
    // Fetch actions success
    case FETCH_ACTIONS_SUCCESS:
      return { 
        ...state,
        actions: action.payload,
        loading: false,
      };
    // Fetch actions failure
    case FETCH_ACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // Fetch action by ID request
    case FETCH_ACTION_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // Fetch action by ID success
    case FETCH_ACTION_BY_ID_SUCCESS:
      return {
        ...state,
        action: action.payload,
        loading: false,
      };
    // Fetch action by ID failure
    case FETCH_ACTION_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // Fetch action by user ID request
    case FETCH_ACTION_BY_USER_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // Fetch action by user ID success
    case FETCH_ACTION_BY_USER_ID_SUCCESS:
      return {
        ...state,
        actionsUser: action.payload,
        loading: false,
      };
    // Fetch action by user ID failure
    case FETCH_ACTION_BY_USER_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // Fetch action by user ID request
    case FETCH_VM_ACTIONS_BY_USER_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // Fetch action by user ID success
    case FETCH_VM_ACTIONS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        VMActions: action.payload,
        loading: false,
      };
    // Fetch action by user ID failure
    case FETCH_VM_ACTIONS_BY_USER_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // Fetch vm validated action by user ID request
    case FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // Fetch VM validated action by user ID success
    case FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        VMValidatedActions: action.payload,
        loading: false,
      };
    // Fetch VM validated action by user ID failure
    case FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // Fetch validated DSM actions request
    case FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_REQUEST:
      return {
        ...state,
      };
    // Fetch validated DSM actions success
    case FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        validatedDSMActions: action.payload,
      };
    // Fetch validated DSM actions failure
    case FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_FAILURE:
      return {
        ...state,
      };
    // Fetch validated CDP actions request
    case FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_REQUEST:
      return {
        ...state,
      };
    // Fetch validated CDP actions success
    case FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        validatedCDPActions: action.payload,
      };
    // Fetch validated CDP actions failure
    case FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_FAILURE:
      return {
        ...state,
      };
    // Fetch rejected DSM actions request
    case FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_REQUEST:
      return {
        ...state,
      };
    // Fetch rejected DSM actions success
    case FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        rejectedDSMActions: action.payload,
      };
    // Fetch rejected DSM actions failure
    case FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_FAILURE:
      return {
        ...state,
      };
    // Fetch rejected CDP actions request
    case FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_REQUEST:
      return {
        ...state,
      };
    // Fetch rejected CDP actions success
    case FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        rejectedCDPActions: action.payload,
      };
    // Fetch rejected CDP actions failure
    case FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_FAILURE:
      return {
        ...state,
      };
    // Fetch speaker actions request
    case FETCH_SPEAKER_ACTIONS_BY_USER_ID_REQUEST:
      return {
        ...state,
      };
    // Fetch speaker actions success
    case FETCH_SPEAKER_ACTIONS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        speakerActions: action.payload,
      };
    // Fetch speaker actions failure
    case FETCH_SPEAKER_ACTIONS_BY_USER_ID_FAILURE:
      return {
        ...state,
      };
    // Add action request
    case ADD_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // Add action success
    case ADD_ACTION_SUCCESS:
      return {
        ...state,
        actionId: action.payload,
        loading: false,
      };
    // Add action failure
    case ADD_ACTION_FAILURE:
      return {
        ...state,
        loading: false,
      };
    // delete action request
    case DELETE_ACTION_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    // delete action success
    case DELETE_ACTION_BY_ID_SUCCESS:
      return {
        ...state,
        action: action.payload,
        loading: false,
      };
    // delete action failure
    case DELETE_ACTION_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};



