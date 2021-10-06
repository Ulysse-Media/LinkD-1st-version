import { ADD_INVOICE_REQUEST, ADD_INVOICE_SUCCESS, ADD_INVOICE_FAILURE, RETRIEVE_INVOICE_REQUEST, RETRIEVE_INVOICE_SUCCESS, RETRIEVE_INVOICE_FAILURE } from "./types";
import  InvoicesServices  from "./services";

// Add invoice
export function addInvoice(values) {
  return async (dispatch) => {
    dispatch({type: ADD_INVOICE_REQUEST});
    try {
      const response = await InvoicesServices.addInvoiceRequest(values);
      dispatch({type: ADD_INVOICE_SUCCESS, payload: "Invoice added successfully!"});
      window.location.reload();
    } catch (e) {
      dispatch({
        type: ADD_INVOICE_FAILURE,
      })
    }
  };
}

// Retrieve invoice
export function retrieveInvoice(action_id) {
  return async (dispatch) => {
    dispatch({type: RETRIEVE_INVOICE_REQUEST});
    try {
      const response = await InvoicesServices.retrieveInvoiceRequest(action_id);
      dispatch({ type: RETRIEVE_INVOICE_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: RETRIEVE_INVOICE_FAILURE,
      })
    }
  };
}







