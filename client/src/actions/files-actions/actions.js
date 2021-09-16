import { ADD_FILE_REQUEST, ADD_FILE_SUCCESS, ADD_FILE_FAILURE, RETRIEVE_FILE_REQUEST, RETRIEVE_FILE_SUCCESS, RETRIEVE_FILE_FAILURE } from "./types";
import  FilesServices  from "./services";

// Add file action
export function addFile(body) {
  return async (dispatch) => {
    dispatch({type: ADD_FILE_REQUEST});
    try {
      const response = await FilesServices.addFileRequest(body);
      dispatch({type: ADD_FILE_SUCCESS, payload: "File added successfully!" });
    } catch (e) {
      dispatch({
        type: ADD_FILE_FAILURE,
      })
    }
  };
}

// Retrive file action
export function retriveFile(action_id) {
  return async (dispatch) => {
    dispatch({type: RETRIEVE_FILE_REQUEST});
    try {
      const response = await FilesServices.retriveFileRequest(action_id);
      dispatch({type: RETRIEVE_FILE_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: RETRIEVE_FILE_FAILURE,
      })
    }
  };
}









