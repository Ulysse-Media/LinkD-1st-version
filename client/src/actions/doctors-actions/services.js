import axiosInstance from "../../config/axios-instance";

// Fetch all doctors //
function fetchDoctors() {
  return axiosInstance({
    method: "get",
    url: "api/doctors",
    data: null,
  });
}

// Fetch last doctor //
function fetchLastDoctor() {
  return axiosInstance({
    method: "get",
    url: "api/doctors/last",
    data: null,
  });
}

// Fetch doctors by user id //
function fetchDoctorsByUserId(user_id) {
  return axiosInstance({
    method: "get",
    url: `api/doctors/VMsupervisors/:${user_id}`,
    data: null,
  });
}

// Fetch invited doctors //
function fetchInvitedDoctors(doctor_name) {
  return axiosInstance({
    method: "get",
    url: `api/doctors/invited`,
    params: {
      doctor_name: doctor_name,
    },
    data: null,
  });
}

// Add new doctor //
function addDoctor(body) {
  return axiosInstance({
    method: "post",
    url: "api/doctors",
    data: body,
  });
}

const DoctorsServices = {
  fetchDoctors,
  fetchLastDoctor,
  fetchDoctorsByUserId,
  fetchInvitedDoctors,
  addDoctor,
};

export default DoctorsServices;