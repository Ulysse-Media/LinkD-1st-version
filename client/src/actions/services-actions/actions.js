import { FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILURE } from "./types";
import ServicesServices from "./services";

// Retrieve all services
export function getServices() {
  return async (dispatch) => {
    dispatch({ type: FETCH_SERVICES_REQUEST });
    try {
      const response = await ServicesServices.fetchServices();
      dispatch({ type: FETCH_SERVICES_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: FETCH_SERVICES_FAILURE,
      })
    }
  };
}