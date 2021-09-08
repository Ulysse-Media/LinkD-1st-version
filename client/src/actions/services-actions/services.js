import axiosInstance from "../../config/axios-instance";

// Fetch all services //
function fetchServices() {
  return axiosInstance({
    method: "get",
    url: "api/services",
    data: null,
  });
}


const ServicesServices = {
  fetchServices,
};

export default ServicesServices;