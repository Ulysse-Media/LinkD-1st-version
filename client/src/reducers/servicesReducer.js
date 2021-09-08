import { FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILURE } from "../actions/services-actions/types";

const INITIAL_STATE = {
  services: [],
};

export const servicesReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch services request
    case FETCH_SERVICES_REQUEST:
      return { 
        ...state,
      };
    // Fetch services success
    case FETCH_SERVICES_SUCCESS:
      return { 
        ...state,
        services: action.payload,
      };
    // Fetch services failure
    case FETCH_SERVICES_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};



