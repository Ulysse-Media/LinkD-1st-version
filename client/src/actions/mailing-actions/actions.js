import { ADD_VM_MAIL_REQUEST, ADD_VM_MAIL_SUCCESS, ADD_VM_MAIL_FAILURE, ADD_SUPERVISORS_MAIL_REQUEST, ADD_SUPERVISORS_MAIL_SUCCESS, ADD_SUPERVISORS_MAIL_FAILURE } from "./types";
import  MailingServices  from "./services";

// Add new mail for archieved actions
export function addVMMailing(action_sender) {
  return async (dispatch) => {
    dispatch({type: ADD_VM_MAIL_REQUEST});
    try {
      const response = await MailingServices.addVMMailingRequest(action_sender);
      dispatch({type: ADD_VM_MAIL_SUCCESS, payload: "Mail added successfully!"});
    } catch (e) {
      dispatch({
        type: ADD_VM_MAIL_FAILURE,
      })
    }
  };
}

// Add new mail for none validated actions
export function addSupervisorsMailing(action_sender) {
  return async (dispatch) => {
    dispatch({type: ADD_SUPERVISORS_MAIL_REQUEST});
    try {
      const response = await MailingServices.addSupervisorsMailingRequest(action_sender);
      dispatch({type: ADD_SUPERVISORS_MAIL_SUCCESS, payload: "Mail added successfully!"});
    } catch (e) {
      dispatch({
        type: ADD_SUPERVISORS_MAIL_FAILURE,
      })
    }
  };
}







