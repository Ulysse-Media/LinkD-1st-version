import { FETCH_AGENCIES_REQUEST, FETCH_AGENCIES_SUCCESS, FETCH_AGENCIES_FAILURE } from "./types";
import AgenciesServices from "./services";

// Retrieve all agencies
export function getAgencies() {
  return async (dispatch) => {
    dispatch({ type: FETCH_AGENCIES_REQUEST });
    try {
      const response = await AgenciesServices.fetchAgencies();
      dispatch({ type: FETCH_AGENCIES_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: FETCH_AGENCIES_FAILURE,
      })
    }
  };
}