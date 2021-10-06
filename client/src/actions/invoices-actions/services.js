import axiosInstance from "../../config/axios-instance";

// Add new invoice //
function addInvoiceRequest(body) {
  return axiosInstance({
    method: "post",
    url: "http://localhost:3000/api/invoices",
    data: body,
  });
}

// Retrieve new invoice //
function retrieveInvoiceRequest(action_id) {
  return axiosInstance({
    method: "get",
    url: "http://localhost:3000/api/invoices",
    params: {
      action_id : action_id
    },
  });
}

const InvoicesServices = {
  addInvoiceRequest,
  retrieveInvoiceRequest
};

export default InvoicesServices;