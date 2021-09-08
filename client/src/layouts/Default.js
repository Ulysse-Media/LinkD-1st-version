
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import { pushNotification } from "../actions/notifications-actions/actions";
import { getActionByUserId } from "../actions/actions-initiation-actions/actions";
import { getNotificationsByVMsupervisor, getNotificationsByDSMsupervisor, getNotificationsByCDPsupervisor } from "../actions/notifications-actions/actions";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
const SERVER = "http://localhost:3001";
const socket = io(SERVER, { transports: ["websocket", "polling"] });

const DefaultLayout = ({ children, noNavbar, noFooter }) => {
  const dispatch = useDispatch();
  // Actions state from redux store
  const actionsUser = useSelector(
    (state) => state.actionsReducer.actionsUser
  );
  // User state from redux store
  const user = useSelector(
    (state) => state.authReducer.user
  );
  // VM Notifications state from redux store
  const VM_notif = useSelector(
    (state) => state.notificationsReducer.notifications_VM_supervisor
  );
  // DSM Notifications state from redux store
  const DSM_notif = useSelector(
    (state) => state.notificationsReducer.notifications_DSM_supervisor
  );
  // CDP Notifications state from redux store
  const CDP_notif = useSelector(
    (state) => state.notificationsReducer.notifications_CDP_supervisor
  );
  // Notes state from redux store
  const notes = useSelector(
    (state) => state.notesReducer.notesActionSender
  );
  useEffect(() => {
    socket.on("ACTION-VALIDATION", (data) => {
      fetchNotifications();
    });
  }, []);
  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    if (user.length) {
      if (user[0].user_position === "VM") {
        dispatch(getNotificationsByVMsupervisor(user[0].user_id));
      } else if (user[0].user_position === "DSM") {
        dispatch(getNotificationsByDSMsupervisor(user[0].user_id));
      } else if (user[0].user_position === "CDP") {
        dispatch(getNotificationsByCDPsupervisor(user[0].user_id));
      }
    }
  }

  // useEffect(() => {
  //   let values = {};
  //   values.notification_sender = user[0].user_id;
  //   values.VM_supervisor = user[0].user_id;
  //   values.notification_name = "Veuillez archiver vos actions non archivées SVP!";
  //   values.DSM_supervisor = user[0].DSM_supervisor;
  //   values.CDP_supervisor = user[0].CDP_supervisor;
  //   values.recieved_since = new Date();
  //   actionsUser.map((element, key) => {
  //     if (element.status === "Terminée et non archivée") {
  //       dispatch(pushNotification(values));
  //     }
  //   })
  // }, []);
  return (
    <Container fluid >
      <Row>
        <MainSidebar />
        <Col
          className="main-content p-0"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          {!noNavbar && <MainNavbar notes={notes} VM_notif={VM_notif} DSM_notif={DSM_notif} CDP_notif={CDP_notif} />}
          {children}
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>
  );
}


DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default DefaultLayout;
