import axiosInstance from "../../config/axios-instance";

// Add new Notification //
function addNotification(body) {
  return axiosInstance({
    method: "post",
    url: "/api/notifications",
    data: body,
  });
}

// Fetch all Notifications //
function fetchNotifications() {
  return axiosInstance({
    method: "get",
    url: "/api/notifications",
    data: null,
  });
}

// Fetch notification by recipient //
function fetchNotificationsByVMsupervisor(VM_supervisor) {
  return axiosInstance({
    method: "get",
    url: `/api/notifications/:${VM_supervisor}`,
    params: {
        VM_supervisor : VM_supervisor
    },
    data: null,
  });
}

// Fetch notification by recipient //
function fetchNotificationsByDSMsupervisor(DSM_supervisor) {
  return axiosInstance({
    method: "get",
    url: `/api/notifications/VM_validated/:${DSM_supervisor}`,
    params: {
        DSM_supervisor : DSM_supervisor
    },
    data: null,
  });
}

// Fetch notification by recipient //
function fetchNotificationsByCDPsupervisor(CDP_supervisor) {
  return axiosInstance({
    method: "get",
    url: `/api/notifications/VM_validated/DSM_validated/:${CDP_supervisor}`,
    params: {
        CDP_supervisor : CDP_supervisor
    },
    data: null,
  });
}

// Mark as read notification by user id //
function markAsReadNotificationsVMsupervisorRequest(notification_id) {
  return axiosInstance({
    method: "post",
    url: `/api/notifications/action/read/VM_supervisor/:${notification_id}`,
    params: {
        notification_id : notification_id
    },
    data: null,
  });
}

// Mark as read notification by user id //
function markAsReadNotificationsDSMsupervisorRequest(notification_id) {
  return axiosInstance({
    method: "post",
    url: `/api/notifications/action/read/DSM_supervisor/:${notification_id}`,
    params: {
        notification_id : notification_id
    },
    data: null,
  });
}
// Mark as read notification by user id //
function markAsReadNotificationsCDPsupervisorRequest(notification_id) {
  return axiosInstance({
    method: "post",
    url: `/api/notifications/action/read/CDP_supervisor/:${notification_id}`,
    params: {
        notification_id : notification_id
    },
    data: null,
  });
}


const NotificationsServices = {
  fetchNotifications,
  addNotification,
  fetchNotificationsByVMsupervisor,
  fetchNotificationsByDSMsupervisor,
  fetchNotificationsByCDPsupervisor,
  markAsReadNotificationsVMsupervisorRequest,
  markAsReadNotificationsDSMsupervisorRequest,
  markAsReadNotificationsCDPsupervisorRequest
};

export default NotificationsServices;