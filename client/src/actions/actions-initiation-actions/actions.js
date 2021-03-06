import { FETCH_ACTIONS_REQUEST, FETCH_ACTIONS_SUCCESS, FETCH_ACTIONS_FAILURE, ADD_ACTION_REQUEST, ADD_ACTION_SUCCESS, ADD_ACTION_FAILURE, FETCH_ACTION_BY_ID_REQUEST, FETCH_ACTION_BY_ID_SUCCESS, FETCH_ACTION_BY_ID_FAILURE, FETCH_ACTION_BY_USER_ID_REQUEST, FETCH_ACTION_BY_USER_ID_SUCCESS, FETCH_ACTION_BY_USER_ID_FAILURE, FETCH_ACTION_BY_OTHER_STAFF_REQUEST, FETCH_ACTION_BY_OTHER_STAFF_SUCCESS, FETCH_ACTION_BY_OTHER_STAFF_FAILURE, FETCH_VM_ACTIONS_BY_USER_ID_REQUEST, FETCH_VM_ACTIONS_BY_USER_ID_SUCCESS, FETCH_VM_ACTIONS_BY_USER_ID_FAILURE, FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_REQUEST, FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_FAILURE, FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_REQUEST, FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_FAILURE, FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_REQUEST, FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_FAILURE, FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_REQUEST, FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_FAILURE, FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_REQUEST, FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_SUCCESS, FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_FAILURE, FETCH_SPEAKER_ACTIONS_BY_USER_ID_REQUEST, FETCH_SPEAKER_ACTIONS_BY_USER_ID_SUCCESS, FETCH_SPEAKER_ACTIONS_BY_USER_ID_FAILURE, UPDATE_ACTION_BY_ID_REQUEST, UPDATE_ACTION_BY_ID_SUCCESS, UPDATE_ACTION_BY_ID_FAILURE, VALIDATE_DSM_STATUS_ACTION_BY_ID_REQUEST, VALIDATE_DSM_STATUS_ACTION_BY_ID_SUCCESS, VALIDATE_DSM_STATUS_ACTION_BY_ID_FAILURE, VALIDATE_DSM_SPEAKER_STATUS_ACTION_BY_ID_REQUEST, VALIDATE_DSM_SPEAKER_STATUS_ACTION_BY_ID_SUCCESS, VALIDATE_DSM_SPEAKER_STATUS_ACTION_BY_ID_FAILURE, VALIDATE_VM_STATUS_ACTION_BY_ID_REQUEST, VALIDATE_VM_STATUS_ACTION_BY_ID_SUCCESS, VALIDATE_VM_STATUS_ACTION_BY_ID_FAILURE, VALIDATE_VM_PENDING_STAFF_STATUS_ACTION_BY_ID_REQUEST, VALIDATE_VM_PENDING_STAFF_STATUS_ACTION_BY_ID_SUCCESS, VALIDATE_VM_PENDING_STAFF_STATUS_ACTION_BY_ID_FAILURE, VALIDATE_CDP_STATUS_ACTION_BY_ID_REQUEST, VALIDATE_CDP_STATUS_ACTION_BY_ID_SUCCESS, VALIDATE_CDP_STATUS_ACTION_BY_ID_FAILURE, VALIDATE_MED_STATUS_ACTION_BY_ID_REQUEST, VALIDATE_MED_STATUS_ACTION_BY_ID_SUCCESS, VALIDATE_MED_STATUS_ACTION_BY_ID_FAILURE, VALIDATE_CDP_FIRST_STATUS_ACTION_BY_ID_REQUEST, VALIDATE_CDP_FIRST_STATUS_ACTION_BY_ID_SUCCESS, VALIDATE_CDP_FIRST_STATUS_ACTION_BY_ID_FAILURE, VALIDATE_MED_FIRST_STATUS_ACTION_BY_ID_REQUEST, VALIDATE_MED_FIRST_STATUS_ACTION_BY_ID_SUCCESS, VALIDATE_MED_FIRST_STATUS_ACTION_BY_ID_FAILURE, DENY_STATUS_DSM_ACTION_BY_ID_REQUEST, DENY_STATUS_DSM_ACTION_BY_ID_SUCCESS, DENY_STATUS_DSM_ACTION_BY_ID_FAILURE, DENY_STATUS_CDP_ACTION_BY_ID_REQUEST, DENY_STATUS_CDP_ACTION_BY_ID_SUCCESS, DENY_STATUS_CDP_ACTION_BY_ID_FAILURE, DELETE_ACTION_BY_ID_REQUEST, DELETE_ACTION_BY_ID_SUCCESS, DELETE_ACTION_BY_ID_FAILURE, RETURN_ACTION_BY_ID_REQUEST, RETURN_ACTION_BY_ID_SUCCESS, RETURN_ACTION_BY_ID_FAILURE, MESSAGING_VALIDATION_REQUEST, MESSAGING_VALIDATION_SUCCESS, MESSAGING_VALIDATION_FAILURE, MESSAGING_REJECTION_REQUEST, MESSAGING_REJECTION_SUCCESS, MESSAGING_REJECTION_FAILURE, SERVICES_REQUEST, SERVICES_SUCCESS, SERVICES_FAILURE, ARCHIVAGE_ACTION_BY_ID_REQUEST, ARCHIVAGE_ACTION_BY_ID_SUCCESS, ARCHIVAGE_ACTION_BY_ID_FAILURE, DISARCHIVAGE_ACTION_BY_ID_REQUEST, DISARCHIVAGE_ACTION_BY_ID_SUCCESS, DISARCHIVAGE_ACTION_BY_ID_FAILURE, FINISH_ACTION_BY_ID_REQUEST, FINISH_ACTION_BY_ID_SUCCESS, FINISH_ACTION_BY_ID_FAILURE, DOWNLOAD_FILE_REQUEST, DOWNLOAD_FILE_SUCCESS, DOWNLOAD_FILE_FAILURE } from "./types";
import ActionsServices from "./services";
import { toast } from 'react-toastify';
toast.configure();

// Retrieve all actions
export function getActions() {
  return async (dispatch) => {
    dispatch({ type: FETCH_ACTIONS_REQUEST });
    try {
      const response = await ActionsServices.fetchActionsRequest();
      dispatch({ type: FETCH_ACTIONS_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: FETCH_ACTIONS_FAILURE,
        payload: e.response.dat
      })
    }
  };
}

// Add action
export function addAction(values) {
  return async (dispatch) => {
    dispatch({ type: ADD_ACTION_REQUEST });
    try {
      const response = await ActionsServices.addActionRequest(values);
      dispatch({ type: ADD_ACTION_SUCCESS, payload: { message: "Action added successfully!", id: response.data.insertId } });
      return response.data.insertId;
    } catch (e) {
      dispatch({
        type: ADD_ACTION_FAILURE,
        payload: e.response.data
      })
    }
  };
}

// Retrieve action by Id
export function getActionById(action_id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchActionByIdRequest(action_id);
      dispatch({ type: FETCH_ACTION_BY_ID_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: FETCH_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Retrieve action by Id
export function getActionByUserId(user_id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ACTION_BY_USER_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchActionByUserIdRequest(user_id);
      dispatch({ type: FETCH_ACTION_BY_USER_ID_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_ACTION_BY_USER_ID_FAILURE,
      })
    }
  };
}

// Retrieve action by other staff
export function getActionByOtherStaff(other_staff) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ACTION_BY_OTHER_STAFF_REQUEST });
    try {
      const response = await ActionsServices.fetchActionByOtherStaffRequest(other_staff);
      dispatch({ type: FETCH_ACTION_BY_OTHER_STAFF_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_ACTION_BY_OTHER_STAFF_FAILURE,
      })
    }
  };
}

// Retrieve VM actions by user ID
export function getVMActionsByUserId(user_id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_VM_ACTIONS_BY_USER_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchVMActionByUserIdRequest(user_id);
      dispatch({ type: FETCH_VM_ACTIONS_BY_USER_ID_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_VM_ACTIONS_BY_USER_ID_FAILURE,
      })
    }
  };
}

// Retrieve VM validated actions by user ID
export function getVMValidatedActionsByUserId(user_id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchVMValidatedActionByUserIdRequest(user_id);
      dispatch({ type: FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_VM_VALIDATED_ACTIONS_BY_USER_ID_FAILURE,
      })
    }
  };
}

// Retrieve Validated DSM actions by user ID
export function getDSMValidatedActionsByUserId(user_id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchDSMValidatedActionByUserIdRequest(user_id);
      dispatch({ type: FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_DSM_VALIDATED_ACTIONS_BY_USER_ID_FAILURE,
      })
    }
  };
}
// Retrieve Validated CDP actions by user ID
export function getCDPValidatedActionsByUserId(user_id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchCDPValidatedActionByUserIdRequest(user_id);
      dispatch({ type: FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_CDP_VALIDATED_ACTIONS_BY_USER_ID_FAILURE,
      })
    }
  };
}

// Retrieve Rejected DSM actions by user ID
export function getDSMRejectedActionsByUserId(user_id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchDSMRejectedActionByUserIdRequest(user_id);
      dispatch({ type: FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_DSM_REJECTED_ACTIONS_BY_USER_ID_FAILURE,
      })
    }
  };
}
// Retrieve Rejected CDP actions by user ID
export function getCDPRejectedActionsByUserId(user_id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchCDPRejectedActionByUserIdRequest(user_id);
      dispatch({ type: FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_CDP_REJECTED_ACTIONS_BY_USER_ID_FAILURE,
      })
    }
  };
}

// Retrieve Speaker actions by user ID
export function getSpeakerActions() {
  return async (dispatch) => {
    dispatch({ type: FETCH_SPEAKER_ACTIONS_BY_USER_ID_REQUEST });
    try {
      const response = await ActionsServices.fetchSpeakerActionRequest();
      dispatch({ type: FETCH_SPEAKER_ACTIONS_BY_USER_ID_SUCCESS, payload: response.data.reverse() });
    } catch (e) {
      dispatch({
        type: FETCH_SPEAKER_ACTIONS_BY_USER_ID_FAILURE,
      })
    }
  };
}

// Update action by Id
export function modifyActionById(action_id, values) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.updateActionByIdRequest(action_id, values);
      dispatch({ type: UPDATE_ACTION_BY_ID_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: UPDATE_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Validate pending VM action by Id
export function validateVMActionById(action_id, user_email, user_id, action_sender, DSM_supervisor, CDP_supervisor) {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_VM_STATUS_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.validateVMStatusActionByIdRequest(action_id, user_email, user_id, action_sender, DSM_supervisor, CDP_supervisor);
      dispatch({ type: VALIDATE_VM_STATUS_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.success(`Votre action a ??t?? valid??e avec success et en attente de validation DSM , Veuillez v??rifier votre boite email ${action_sender} SVP...`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 3000)
    } catch (e) {
      dispatch({
        type: VALIDATE_VM_STATUS_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Validate VM action by Id pending staff
export function validateVMStaffActionById(action_id, user_email, user_id, action_sender, DSM_supervisor, CDP_supervisor) {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_VM_PENDING_STAFF_STATUS_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.validateVMStaffStatusActionByIdRequest(action_id, user_email, user_id, action_sender, DSM_supervisor, CDP_supervisor);
      dispatch({ type: VALIDATE_VM_PENDING_STAFF_STATUS_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.success(`Votre action a ??t?? valid??e avec success et en attente de validation de staff sanofi , Veuillez v??rifier votre boite email ${action_sender} SVP...`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 3000)
    } catch (e) {
      dispatch({
        type: VALIDATE_VM_PENDING_STAFF_STATUS_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Validate pending DSM action by Id
export function validateDSMActionById(action_id, user_email, user_id, action_sender) {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_DSM_STATUS_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.validateDSMStatusActionByIdRequest(action_id, user_email, user_id, action_sender);
      dispatch({ type: VALIDATE_DSM_STATUS_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.success(`Action valid??e avec success et en attente de validation CDP, Un email a ??t?? envoy??e au demandeur d'action sur l'adresse e-mail ${action_sender}`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 3000)
    } catch (e) {
      dispatch({
        type: VALIDATE_DSM_STATUS_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Validate pending DSM speaker action by Id
export function validateDSMSpeakerActionById(action_id, user_email, user_id, action_sender) {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_DSM_SPEAKER_STATUS_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.validateDSMSpeakerStatusActionByIdRequest(action_id, user_email, user_id, action_sender);
      dispatch({ type: VALIDATE_DSM_SPEAKER_STATUS_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.success(`Action valid??e avec success et en attente de validation CDP et MED, Un email a ??t?? envoy??e au demandeur d'action sur l'adresse e-mail ${action_sender}`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 3000)
    } catch (e) {
      dispatch({
        type: VALIDATE_DSM_SPEAKER_STATUS_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Validate pending CDP action by Id
export function validateCDPFirstActionById(action_id, user_email, user_id, action_sender) {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_CDP_FIRST_STATUS_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.validateCDPFirstStatusActionByIdRequest(action_id, user_email, user_id, action_sender);
      dispatch({ type: VALIDATE_CDP_FIRST_STATUS_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.success(`Action valid??e avec success, Un email a ??t?? envoy??e au demandeur d'action sur l'adresse e-mail ${action_sender}`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 3000)
    } catch (e) {
      dispatch({
        type: VALIDATE_CDP_FIRST_STATUS_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Validate pending CDP action by Id
export function validateCDPActionById(action_id, user_email, user_id, action_sender) {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_CDP_STATUS_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.validateCDPStatusActionByIdRequest(action_id, user_email, user_id, action_sender);
      dispatch({ type: VALIDATE_CDP_STATUS_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.success(`Action valid??e avec success, Un email a ??t?? envoy??e au demandeur d'action sur l'adresse e-mail ${action_sender}`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 3000)
    } catch (e) {
      dispatch({
        type: VALIDATE_CDP_STATUS_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Validate pending MED action by Id
export function validateMEDFirstActionById(action_id, user_email, user_id, action_sender) {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_MED_FIRST_STATUS_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.validateMEDFirstStatusActionByIdRequest(action_id, user_email, user_id, action_sender);
      dispatch({ type: VALIDATE_MED_FIRST_STATUS_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.success(`Action valid??e avec success, Un email a ??t?? envoy??e au demandeur d'action sur l'adresse e-mail ${action_sender}`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 3000)
    } catch (e) {
      dispatch({
        type: VALIDATE_MED_FIRST_STATUS_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Validate pending MED action by Id
export function validateMEDActionById(action_id, user_email, user_id, action_sender) {
  return async (dispatch) => {
    dispatch({ type: VALIDATE_MED_STATUS_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.validateMEDStatusActionByIdRequest(action_id, user_email, user_id, action_sender);
      dispatch({ type: VALIDATE_MED_STATUS_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.success(`Action valid??e avec success, Un email a ??t?? envoy??e au demandeur d'action sur l'adresse e-mail ${action_sender}`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 3000)
    } catch (e) {
      dispatch({
        type: VALIDATE_MED_STATUS_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Deny pending DSM action by Id
export function denyDSMActionById(action_id, user_id) {
  return async (dispatch) => {
    dispatch({ type: DENY_STATUS_DSM_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.denyDSMStatusActionByIdRequest(action_id, user_id);
      dispatch({ type: DENY_STATUS_DSM_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.error("Action rejet??e avec success!", {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 1000)
    } catch (e) {
      dispatch({
        type: DENY_STATUS_DSM_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Deny pending CDP action by Id
export function denyCDPActionById(action_id, user_id) {
  return async (dispatch) => {
    dispatch({ type: DENY_STATUS_CDP_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.denyCDPStatusActionByIdRequest(action_id, user_id);
      dispatch({ type: DENY_STATUS_CDP_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.error("Action rejet??e avec success!", {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 1000)
    } catch (e) {
      dispatch({
        type: DENY_STATUS_CDP_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Remove VM action by Id
export function removeActionById(action_id) {
  return async (dispatch) => {
    dispatch({ type: DELETE_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.deleteActionByIdRequest(action_id);
      dispatch({ type: DELETE_ACTION_BY_ID_SUCCESS, payload: response.data });
      toast.error("Votre action a ??t?? retir??e avec success!", {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 1000)
    } catch (e) {
      dispatch({
        type: DELETE_ACTION_BY_ID_FAILURE,
        payload: e.response.data
      })
    }
  };
}

// Return VM action by Id
export function returnActionById(action_id) {
  return async (dispatch) => {
    dispatch({ type: RETURN_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.returnActionByIdRequest(action_id);
      dispatch({ type: RETURN_ACTION_BY_ID_SUCCESS });
      toast.error("Votre action a ??t?? en retour ?? la modification!", {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 1000)
    } catch (e) {
      dispatch({
        type: RETURN_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Disarchive action by Id
export function disarchiveActionById(action_id) {
  return async (dispatch) => {
    dispatch({ type: DISARCHIVAGE_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.disarchiveActionByIdRequest(action_id);
      dispatch({ type: DISARCHIVAGE_ACTION_BY_ID_SUCCESS });
    } catch (e) {
      dispatch({
        type: DISARCHIVAGE_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Archive action by Id
export function archiveActionById(action_id, present_doctors) {
  return async (dispatch) => {
    dispatch({ type: ARCHIVAGE_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.archiveActionByIdRequest(action_id, present_doctors);
      dispatch({ type: ARCHIVAGE_ACTION_BY_ID_SUCCESS });
      toast.success("Votre action a ??t?? archiv??e avec success!", {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 1000)
    } catch (e) {
      dispatch({
        type: ARCHIVAGE_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Finish action by Id
export function finishActionById(action_id) {
  return async (dispatch) => {
    dispatch({ type: FINISH_ACTION_BY_ID_REQUEST });
    try {
      const response = await ActionsServices.finishActionByIdRequest(action_id);
      dispatch({ type: FINISH_ACTION_BY_ID_SUCCESS });
      toast.success("Action a ??t?? finalis??e avec success!", {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 1000)
    } catch (e) {
      dispatch({
        type: FINISH_ACTION_BY_ID_FAILURE,
      })
    }
  };
}

// Messaging user
export function messagingValidation(to, action) {
  return async (dispatch) => {
    dispatch({ type: MESSAGING_VALIDATION_REQUEST });
    try {
      const response = await ActionsServices.messagingValidationRequest(to, action);
      dispatch({ type: MESSAGING_VALIDATION_SUCCESS });
    } catch (e) {
      dispatch({
        type: MESSAGING_VALIDATION_FAILURE,
      })
    }
  };
}

// Messaging user
export function messagingRejection(to, action) {
  return async (dispatch) => {
    dispatch({ type: MESSAGING_REJECTION_REQUEST });
    try {
      const response = await ActionsServices.messagingRejectionRequest(to, action);
      dispatch({ type: MESSAGING_REJECTION_SUCCESS });
    } catch (e) {
      dispatch({
        type: MESSAGING_REJECTION_FAILURE,
      })
    }
  };
}

// Services after action validated
export function validateservices(values, action) {
  return async (dispatch) => {
    dispatch({ type: SERVICES_REQUEST });
    try {
      const response = await ActionsServices.validateServicesRequest(values, action);
      dispatch({ type: SERVICES_SUCCESS, payload: response.data });
      toast.success(`Veuillez v??rifier votre adresse email SVP ..`, {
        position: toast.POSITION.TOP_LEFT
      });
      setInterval(() => {
        window.location.reload();
      }, 1000)
    } catch (e) {
      dispatch({
        type: SERVICES_FAILURE,
      })
    }
  };
}

// Download file
export function downloadFile(html) {
  return async (dispatch) => {
    dispatch({ type: DOWNLOAD_FILE_REQUEST });
    try {
      const response = await ActionsServices.downloadFileRequest(html);
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      link.download = `generated-action.pdf`;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      link.parentNode.removeChild(link);
      dispatch({ type: DOWNLOAD_FILE_SUCCESS });
    } catch (e) {
      dispatch({
        type: DOWNLOAD_FILE_FAILURE,
      })
    }
  };
}










