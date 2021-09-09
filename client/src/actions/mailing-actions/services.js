import axiosInstance from "../../config/axios-instance";

// Add new Mailing //
function addMailing(action_sender) {
    return axiosInstance({
      method: "post",
      url: "api/mailings",
      data: null,
      params : {
        action_sender : action_sender
      }
    });
  }

  const MailingServices = {
    addMailing,
  };
  
  export default MailingServices;