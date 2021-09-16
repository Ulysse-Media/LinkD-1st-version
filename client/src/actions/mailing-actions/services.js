import axiosInstance from "../../config/axios-instance";

// Add new Mailing for archieved actions //
function addVMMailingRequest(action_sender) {
    return axiosInstance({
      method: "post",
      url: "api/mailings/archieved/actions",
      data: null,
      params : {
        action_sender : action_sender
      }
    });
  }

// Add new Mailing for not validated actions //
function addSupervisorsMailingRequest(action_sender) {
    return axiosInstance({
      method: "post",
      url: "api/mailings/notValidated/actions",
      data: null,
      params : {
        action_sender : action_sender
      }
    });
  }

  const MailingServices = {
    addVMMailingRequest,
    addSupervisorsMailingRequest
  };
  
  export default MailingServices;