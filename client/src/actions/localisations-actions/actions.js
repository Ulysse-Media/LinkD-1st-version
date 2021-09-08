import { ADD_LOCALISATION_REQUEST, ADD_LOCALISATION_SUCCESS, ADD_LOCALISATION_FAILURE, FETCH_LOCALISATIONS_REQUEST, FETCH_LOCALISATIONS_SUCCESS, FETCH_LOCALISATIONS_FAILURE } from "./types";
import  LocalisationsServices  from "./services";

// Retrieve all localisations
export function getLocalisations() {
  return async (dispatch) => {
    dispatch({type: FETCH_LOCALISATIONS_REQUEST});
    try {
      const response = await LocalisationsServices.fetchLocalisations();
      dispatch({type: FETCH_LOCALISATIONS_SUCCESS, payload: response.data});
    } catch (e) {
      dispatch({
        type: FETCH_LOCALISATIONS_FAILURE,
        payload: e.response.data
      })
    }
  };
}

// Add new localisation
export function addLocalisation(values) {
  return async (dispatch) => {
    dispatch({type: ADD_LOCALISATION_REQUEST});
    try {
      dispatch({type: ADD_LOCALISATION_SUCCESS, payload: "Localisation added successfully!"});
    } catch (e) {
      dispatch({
        type: ADD_LOCALISATION_FAILURE,
        payload: e.response.data
      })
    }
  };
}







