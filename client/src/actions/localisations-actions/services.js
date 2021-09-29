import axiosInstance from "../../config/axios-instance";

// Fetch all localisations //
function fetchLocalisations() {
    return axiosInstance({
      method: "get",
      url: "api/localisations",
      data: null,
    });
  }
  
  const LocalisationsServices = {
    fetchLocalisations,
  };
  
  export default LocalisationsServices;