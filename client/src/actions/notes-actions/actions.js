import { ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE, FETCH_NOTES_BY_ACTION_SENDER_REQUEST, FETCH_NOTES_BY_ACTION_SENDER_SUCCESS, FETCH_NOTES_BY_ACTION_SENDER_FAILURE } from "./types";
import NotesServices from "./services";

// Add new note
export function addNote(values) {
    return async (dispatch) => {
        dispatch({ type: ADD_NOTE_REQUEST });
        try {
            const response = await NotesServices.addNoteRequest(values);
            dispatch({ type: ADD_NOTE_SUCCESS, payload: "Note added successfully!" });
        } catch (e) {
            dispatch({
                type: ADD_NOTE_FAILURE,
            })
        }
    };
}

// Retrieve all notes by action sender
export function getNotesByActionSender(action_sender) {
    return async (dispatch) => {
        dispatch({ type: FETCH_NOTES_BY_ACTION_SENDER_REQUEST });
        try {
            const response = await NotesServices.fetchNotesByActionSender(action_sender);
            dispatch({ type: FETCH_NOTES_BY_ACTION_SENDER_SUCCESS, payload: response.data });
        } catch (e) {
            dispatch({
                type: FETCH_NOTES_BY_ACTION_SENDER_FAILURE,
            })
        }
    };
}









