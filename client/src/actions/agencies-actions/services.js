import axiosInstance from "../../config/axios-instance";

// Fetch all agencies //
function fetchAgencies() {
  return axiosInstance({
    method: "get",
    url: "api/agencies",
    data: null,
  });
}


const AgenciesServices = {
    fetchAgencies,
};

export default AgenciesServices;