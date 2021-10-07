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
function fetchActionsRequest() {
  return axiosInstance({
    method: "get",
    url: "/api/actions",
    data: null,
  });
}

// Fetch action by Id //
function fetchActionByIdRequest(action_id) {
  return axiosInstance.get(`/api/actions/:${action_id}`, {
    params: {
      action_id: action_id
    },
  })
}

// Fetch action by user Id //
function fetchActionByUserIdRequest(user_id) {
  return axiosInstance.get(`/api/actions/user/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch action by other staff //
function fetchActionByOtherStaffRequest(other_staff) {
  return axiosInstance.get(`/api/actions/user/VMvalidated/:${other_staff}`, {
    params: {
      other_staff: other_staff
    },
  })
}

// Fetch VM actions by user id //
function fetchVMActionByUserIdRequest(user_id) {
  return axiosInstance.get(`/api/actions/user/VM/actions/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}
// Fetch VM actions by user id //
function fetchVMValidatedActionByUserIdRequest(user_id) {
  return axiosInstance.get(`/api/actions/user/VM/validated/actions/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch DSM validated actions by user id //
function fetchDSMValidatedActionByUserIdRequest(user_id) {
  return axiosInstance.get(`/api/actions/user/validation/DSMvalidated/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch CDP validated actions by user id //
function fetchCDPValidatedActionByUserIdRequest(user_id) {
  return axiosInstance.get(`/api/actions/user/validation/CDPvalidated/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch DSM rejected actions by user id //
function fetchDSMRejectedActionByUserIdRequest(user_id) {
  return axiosInstance.get(`/api/actions/user/rejection/DSMrejected/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch CDP rejected actions by user id //
function fetchCDPRejectedActionByUserIdRequest(user_id) {
  return axiosInstance.get(`/api/actions/user/rejection/CDPrejected/:${user_id}`, {
    params: {
      user_id: user_id
    },
  })
}

// Fetch Speaker actions by user id //
function fetchSpeakerActionRequest() {
  return axiosInstance.get(`/api/actions/user/validation/DSMvalidated/speaker`)
}


// Update action by Id //
function updateActionByIdRequest(action_id, body) {
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
function validateVMStatusActionByIdRequest(action_id, user_email, user_id, action_sender, DSM_supervisor, CDP_supervisor) {
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

// Validate VM pending staff action by Id //
function validateVMStaffStatusActionByIdRequest(action_id, user_email, user_id, action_sender, DSM_supervisor, CDP_supervisor) {
  return axiosInstance({
    method: "post",
    url: `/api/actions/user/VMvalidated/pending/staff`,
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
function validateDSMStatusActionByIdRequest(action_id, user_email, user_id, action_sender) {
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
function validateDSMSpeakerStatusActionByIdRequest(action_id, user_email, user_id, action_sender) {
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
function validateCDPFirstStatusActionByIdRequest(action_id, user_email, user_id, action_sender) {
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
function validateCDPStatusActionByIdRequest(action_id, user_email, user_id, action_sender) {
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
function validateMEDFirstStatusActionByIdRequest(action_id, user_email, user_id, action_sender) {
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
function validateMEDStatusActionByIdRequest(action_id, user_email, user_id, action_sender) {
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
function denyDSMStatusActionByIdRequest(action_id, user_id) {
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
function denyCDPStatusActionByIdRequest(action_id, user_id) {
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
function deleteActionByIdRequest(action_id) {
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
  fetchActionsRequest,
  addActionRequest,
  fetchActionByIdRequest,
  fetchActionByUserIdRequest,
  fetchActionByOtherStaffRequest,
  fetchVMActionByUserIdRequest,
  fetchVMValidatedActionByUserIdRequest,
  fetchDSMValidatedActionByUserIdRequest,
  validateDSMSpeakerStatusActionByIdRequest,
  fetchCDPValidatedActionByUserIdRequest,
  fetchDSMRejectedActionByUserIdRequest,
  fetchCDPRejectedActionByUserIdRequest,
  fetchSpeakerActionRequest,
  updateActionByIdRequest,
  validateVMStatusActionByIdRequest,
  validateVMStaffStatusActionByIdRequest,
  validateDSMStatusActionByIdRequest,
  validateCDPStatusActionByIdRequest,
  validateMEDFirstStatusActionByIdRequest,
  validateMEDStatusActionByIdRequest,
  denyDSMStatusActionByIdRequest,
  denyCDPStatusActionByIdRequest,
  validateCDPFirstStatusActionByIdRequest,
  deleteActionByIdRequest,
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