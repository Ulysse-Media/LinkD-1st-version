import axiosInstance from "../../config/axios-instance";

// Add new localisation //
function addNoteRequest(body) {
    return axiosInstance({
        method: "post",
        url: "api/notes",
        data: body,
    });
}

// Fetch all localisations //
function fetchNotesByActionSender(action_sender) {
    return axiosInstance({
        method: "get",
        url: `api/notes/:${action_sender}`,
        data: null,
        params: {
            action_sender : action_sender
        }
    });
}

const NotesServices = {
    addNoteRequest,
    fetchNotesByActionSender,
};

export default NotesServices;