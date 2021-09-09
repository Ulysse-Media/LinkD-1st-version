import { ADD_MAIL_REQUEST, ADD_MAIL_SUCCESS, ADD_MAIL_FAILURE } from "./types";
import  MailingServices  from "./services";

// Add new MAIL
export function addMail(action_sender) {
  return async (dispatch) => {
    dispatch({type: ADD_MAIL_REQUEST});
    try {
      const response = await MailingServices.addMailing(action_sender);
      dispatch({type: ADD_MAIL_SUCCESS, payload: "Mail added successfully!"});
    } catch (e) {
      dispatch({
        type: ADD_MAIL_FAILURE,
      })
    }
  };
}







