import { RETRIEVE_INVOICE_REQUEST, RETRIEVE_INVOICE_SUCCESS, RETRIEVE_INVOICE_FAILURE } from "../actions/invoices-actions/types";

const INITIAL_STATE = {
  invoice: [],
};

export const invoicesReducer = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    // Fetch invoice request
    case RETRIEVE_INVOICE_REQUEST:
      return { 
        ...state,
      };
    // Fetch invoice success
    case RETRIEVE_INVOICE_SUCCESS:
      return { 
        ...state,
        invoice: action.payload,
      };
    // Fetch invoice failure
    case RETRIEVE_INVOICE_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};



