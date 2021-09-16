import axiosInstance from "../../config/axios-instance";

// Add new file request //
function addFileRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/api/files",
    data: body,
    headers: {
      Content_type: "Multipart/form-data"
    }
  });
}

// Retrive file //
function retriveFileRequest(action_id) {
  return axiosInstance({
    method: "get",
    url: "/api/files",
    params: {
      action_id : action_id
    },
  });
}

const FilesServices = {
  addFileRequest,
  retriveFileRequest
};

export default FilesServices;