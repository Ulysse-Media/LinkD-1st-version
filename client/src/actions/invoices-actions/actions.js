import { ADD_INVOICE_REQUEST, ADD_INVOICE_SUCCESS, ADD_INVOICE_FAILURE } from "./types";
import  InvoicesServices  from "./services";

// Add invoice
export function addInvoice(values) {
  return async (dispatch) => {
    dispatch({type: ADD_INVOICE_REQUEST});
    try {
      const response = await InvoicesServices.addInvoice(values);
      dispatch({type: ADD_INVOICE_SUCCESS, payload: "Invoice added successfully!"});
      window.location.reload();
    } catch (e) {
      dispatch({
        type: ADD_INVOICE_FAILURE,
      })
    }
  };
}







