import { PUSH_NOTIFICATION_REQUEST, PUSH_NOTIFICATION_SUCCESS, PUSH_NOTIFICATION_FAILURE, FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_REQUEST, FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_SUCCESS, FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_FAILURE, FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_REQUEST, FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_SUCCESS, FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_FAILURE, FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_REQUEST, FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_SUCCESS, FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_FAILURE, MARK_AS_READ_NOTIFICATIONS_BY_VM_SUPERVISOR_REQUEST, MARK_AS_READ_NOTIFICATIONS_BY_VM_SUPERVISOR_SUCCESS, MARK_AS_READ_NOTIFICATIONS_BY_VM_SUPERVISOR_FAILURE, MARK_AS_READ_NOTIFICATIONS_BY_DSM_SUPERVISOR_REQUEST, MARK_AS_READ_NOTIFICATIONS_BY_DSM_SUPERVISOR_SUCCESS, MARK_AS_READ_NOTIFICATIONS_BY_DSM_SUPERVISOR_FAILURE, MARK_AS_READ_NOTIFICATIONS_BY_CDP_SUPERVISOR_REQUEST, MARK_AS_READ_NOTIFICATIONS_BY_CDP_SUPERVISOR_SUCCESS, MARK_AS_READ_NOTIFICATIONS_BY_CDP_SUPERVISOR_FAILURE } from "./types";
import NotificationsServices from "./services";
// import { Howl } from 'howler';
// import newSound from './notification.mp3';

// Retrieve Notification by recipient 
export function getNotificationsByVMsupervisor(VM_supervisor) {
  return async (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_REQUEST });
    try {
      const response = await NotificationsServices.fetchNotificationsByVMsupervisor(VM_supervisor);
      dispatch({ type: FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: FETCH_NOTIFICATIONS_BY_VM_SUPERVISOR_FAILURE,
      })
    }
  };
}

// Retrieve Notification by recipient 
export function getNotificationsByDSMsupervisor(DSM_supervisor) {
  return async (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_REQUEST });
    try {
      const response = await NotificationsServices.fetchNotificationsByDSMsupervisor(DSM_supervisor);
      dispatch({ type: FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: FETCH_NOTIFICATIONS_BY_DSM_SUPERVISOR_FAILURE,
      })
    }
  };
}

// Retrieve Notification by recipient 
export function getNotificationsByCDPsupervisor(CDP_supervisor) {
  return async (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_REQUEST });
    try {
      const response = await NotificationsServices.fetchNotificationsByCDPsupervisor(CDP_supervisor);
      dispatch({ type: FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: FETCH_NOTIFICATIONS_BY_CDP_SUPERVISOR_FAILURE,
      })
    }
  };
}

// Push notifications
export function pushNotification(values) {
  return async (dispatch) => {
    dispatch({ type: PUSH_NOTIFICATION_REQUEST });
    try {
      const response = await NotificationsServices.addNotification(values);
      dispatch({ type: PUSH_NOTIFICATION_SUCCESS });
    } catch (e) {
      dispatch({
        type: PUSH_NOTIFICATION_FAILURE,
      })
    }
  };
}

// Mark as read notifications
export function markAsReadNotificationsByVMsupervisor(notification_id) {
  return async (dispatch) => {
    dispatch({ type: MARK_AS_READ_NOTIFICATIONS_BY_VM_SUPERVISOR_REQUEST });
    try {
      const response = await NotificationsServices.markAsReadNotificationsVMsupervisorRequest(notification_id);
      dispatch({ type: MARK_AS_READ_NOTIFICATIONS_BY_VM_SUPERVISOR_SUCCESS });
    } catch (e) {
      dispatch({
        type: MARK_AS_READ_NOTIFICATIONS_BY_VM_SUPERVISOR_FAILURE,
      })
    }
  };
}

// Mark as read notifications
export function markAsReadNotificationsByDSMsupervisor(notification_id) {
  return async (dispatch) => {
    dispatch({ type: MARK_AS_READ_NOTIFICATIONS_BY_DSM_SUPERVISOR_REQUEST });
    try {
      const response = await NotificationsServices.markAsReadNotificationsDSMsupervisorRequest(notification_id);
      dispatch({ type: MARK_AS_READ_NOTIFICATIONS_BY_DSM_SUPERVISOR_SUCCESS });
    } catch (e) {
      dispatch({
        type: MARK_AS_READ_NOTIFICATIONS_BY_DSM_SUPERVISOR_FAILURE,
      })
    }
  };
}

// Mark as read notifications
export function markAsReadNotificationsByCDPsupervisor(notification_id) {
  return async (dispatch) => {
    dispatch({ type: MARK_AS_READ_NOTIFICATIONS_BY_CDP_SUPERVISOR_REQUEST });
    try {
      const response = await NotificationsServices.markAsReadNotificationsCDPsupervisorRequest(notification_id);
      dispatch({ type: MARK_AS_READ_NOTIFICATIONS_BY_CDP_SUPERVISOR_SUCCESS });
    } catch (e) {
      dispatch({
        type: MARK_AS_READ_NOTIFICATIONS_BY_CDP_SUPERVISOR_FAILURE,
      })
    }
  };
}

// const SoundPlay = () => {
//   const Sounds = new Howl({
//     src: [newSound],
//     loop: false,
//     preload: true,
//   })
//   Sounds.play()
// }









