import axiosInstance from "../../config/axios-instance";

// Add new action //
function addActionRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/api/actions",
    data: body,
    headers: {
      Content_type: "Multipart/form-data"
    }
  });
}

// Fetch all actions //
function fetchActions() {
  return axiosInstance({
    method: "get",
    url: "/api/actions",
    data: null,
  });
}

// Fetch action by Id //
function fetchActionById(action_id) {
  return axiosInstance.get(`/api/actions/:${action_id}`, {
    params: {
      action_id: action_id
    },
  })
}

// Fetch action by user Id //
function fetchActionByUserId(user_id) {
  return axiosInstance.get(`/api/actions/user/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch VM actions by user id //
function fetchVMActionByUserId(user_id) {
  return axiosInstance.get(`/api/actions/user/VM/actions/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}
// Fetch VM actions by user id //
function fetchVMValidatedActionByUserId(user_id) {
  return axiosInstance.get(`/api/actions/user/VM/validated/actions/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch DSM validated actions by user id //
function fetchDSMValidatedActionByUserId(user_id) {
  return axiosInstance.get(`/api/actions/user/validation/DSMvalidated/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch CDP validated actions by user id //
function fetchCDPValidatedActionByUserId(user_id) {
  return axiosInstance.get(`/api/actions/user/validation/CDPvalidated/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch DSM rejected actions by user id //
function fetchDSMRejectedActionByUserId(user_id) {
  return axiosInstance.get(`/api/actions/user/rejection/DSMrejected/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch CDP rejected actions by user id //
function fetchCDPRejectedActionByUserId(user_id) {
  return axiosInstance.get(`/api/actions/user/rejection/CDPrejected/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch Speaker actions by user id //
function fetchSpeakerAction() {
  return axiosInstance.get(`/api/actions/user/validation/DSMvalidated/speaker`)
}


// Update action by Id //
function updateActionById(action_id, body) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/:${action_id}`,
    data: body,
    params: {
      action_id: action_id
    }
  })
}

// Validate VM action by Id //
function validateVMStatusActionById(action_id, user_email, user_id, action_sender, DSM_supervisor, CDP_supervisor) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/VMvalidated`,
    params: {
      action_id: action_id,
      user_email: user_email,
      user_id: user_id,
      action_sender: action_sender,
      DSM_supervisor: DSM_supervisor,
      CDP_supervisor: CDP_supervisor,
    }
  })
}

// Validate DSM action by Id //
function validateDSMStatusActionById(action_id, user_email, user_id, action_sender) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/DSMvalidated`,
    params: {
      action_id: action_id,
      user_email: user_email,
      user_id: user_id,
      action_sender: action_sender
    }
  })
}

// Validate DSM action by Id //
function validateDSMSpeakerStatusActionById(action_id, user_email, user_id, action_sender) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/DSMSpeakervalidated`,
    params: {
      action_id: action_id,
      user_email: user_email,
      user_id: user_id,
      action_sender: action_sender
    }
  })
}


// Validate VM action by Id //
function validateCDPFirstStatusActionById(action_id, user_email, user_id, action_sender) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/CDPvalidated/first`,
    params: {
      action_id: action_id,
      user_email: user_email,
      user_id: user_id,
      action_sender: action_sender,
    }
  })
}

// Validate VM action by Id //
function validateCDPStatusActionById(action_id, user_email, user_id, action_sender) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/CDPvalidated`,
    params: {
      action_id: action_id,
      user_email: user_email,
      user_id: user_id,
      action_sender: action_sender,
    }
  })
}

// Validate VM action by Id //
function validateMEDFirstStatusActionById(action_id, user_email, user_id, action_sender) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/MEDvalidated/first`,
    params: {
      action_id: action_id,
      user_email: user_email,
      user_id: user_id,
      action_sender: action_sender,
    }
  })
}

// Validate VM action by Id //
function validateMEDStatusActionById(action_id, user_email, user_id, action_sender) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/MEDvalidated`,
    params: {
      action_id: action_id,
      user_email: user_email,
      user_id: user_id,
      action_sender: action_sender,
    }
  })
}

// Reject DSM action by Id //
function denyDSMStatusActionById(action_id, user_id) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/DSMdenied`,
    params: {
      action_id: action_id,
      user_id: user_id,
    }
  })
}

// Reject CDP action by Id //
function denyCDPStatusActionById(action_id, user_id) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/CDPdenied`,
    params: {
      action_id: action_id,
      user_id: user_id
    }
  })
}

// Remove VM action by Id //
function deleteActionById(action_id) {
  return axiosInstance.delete(`/api/actions/:${action_id}`, {
    params: {
      action_id: action_id
    }
  })
}

// Return VM action by Id //
function returnActionByIdRequest(action_id) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/returned/:${action_id}`,
    params: {
      action_id: action_id,
    }
  })
}

// Disarchive action by Id //
function disarchiveActionByIdRequest(action_id) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/disarchived/:${action_id}`,
    params: {
      action_id: action_id,
    }
  })
}

// Archive action by Id //
function archiveActionByIdRequest(action_id, present_doctors) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/archived/:${action_id}`,
    params: {
      action_id: action_id,
    },
    data: {
      present_doctors: present_doctors
    }
  })
}

// Finish action by Id //
function finishActionByIdRequest(action_id) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/finished/:${action_id}`,
    params: {
      action_id: action_id,
    },
    data: null
  })
}

// Messaging validation user //
function messagingValidationRequest(to, action) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/twilio/messaging/validation`,
    data: {
      to: to,
      action: action
    }
  })
}

// Messaging rejection user //
function messagingRejectionRequest(to, action) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/twilio/messaging/rejection`,
    data: {
      to: to,
      action: action
    }
  })
}

// Services after validation //
function validateServicesRequest(values, action) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/CDPvalidated/services`,
    data: {
      values,
      action
    },
  })
}

// Services after validation //
function downloadFileRequest(html) {
  return axiosInstance({
    method: "get",
    url: `/api/actions/user/finished/download`,
    responseType: 'blob', // Important
    params: {
      html: html
    },
  })
}

const ActionsServices = {
  fetchActions,
  addActionRequest,
  fetchActionById,
  fetchActionByUserId,
  fetchVMActionByUserId,
  fetchVMValidatedActionByUserId,
  fetchDSMValidatedActionByUserId,
  validateDSMSpeakerStatusActionById,
  fetchCDPValidatedActionByUserId,
  fetchDSMRejectedActionByUserId,
  fetchCDPRejectedActionByUserId,
  fetchSpeakerAction,
  updateActionById,
  validateDSMStatusActionById,
  validateVMStatusActionById,
  validateCDPStatusActionById,
  validateMEDFirstStatusActionById,
  validateMEDStatusActionById,
  denyDSMStatusActionById,
  denyCDPStatusActionById,
  validateCDPFirstStatusActionById,
  deleteActionById,
  returnActionByIdRequest,
  disarchiveActionByIdRequest,
  archiveActionByIdRequest,
  finishActionByIdRequest,
  messagingValidationRequest,
  messagingRejectionRequest,
  validateServicesRequest,
  downloadFileRequest
};

export default ActionsServices;