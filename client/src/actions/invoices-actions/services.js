import axiosInstance from "../../config/axios-instance";

// Add new invoice //
function addInvoice(body) {
  return axiosInstance({
    method: "post",
    url: "api/invoices",
    data: body,
  });
}

const InvoicesServices = {
  addInvoice
};

export default InvoicesServices;