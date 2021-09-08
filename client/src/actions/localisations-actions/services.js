import axiosInstance from "../../config/axios-instance";

// Fetch all localisations //
function fetchLocalisations() {
    return axiosInstance({
      method: "get",
      url: "api/localisations",
      data: null,
    });
  }

// Add new localisation //
function addLocalisation(body) {
    return axiosInstance({
      method: "post",
      url: "api/localisations",
      data: body,
    });
  }

  const LocalisationsServices = {
    fetchLocalisations,
    addLocalisation,
  };
  
  export default LocalisationsServices;