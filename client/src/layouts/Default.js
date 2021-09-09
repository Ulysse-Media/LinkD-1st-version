
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import { pushNotification } from "../actions/notifications-actions/actions";
import { getActionByUserId, getVMActionsByUserId, getVMValidatedActionsByUserId, getSpeakerActions } from "../actions/actions-initiation-actions/actions";
import { addMail } from "../actions/mailing-actions/actions";
import { getNotificationsByVMsupervisor, getNotificationsByDSMsupervisor, getNotificationsByCDPsupervisor } from "../actions/notifications-actions/actions";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
const SERVER = "http://localhost:3001";
const socket = io(SERVER, { transports: ["websocket", "polling"] });

const DefaultLayout = ({ children, noNavbar, noFooter }) => {
  const mounted = useRef();
  const dispatch = useDispatch();
  // Actions state from redux store
  const actionsUser = useSelector(
    (state) => state.actionsReducer.actionsUser
  );
  // Actions state from redux store
  const VMActions = useSelector(
    (state) => state.actionsReducer.VMActions
  );
  // Actions state from redux store
  const VMValidatedActions = useSelector(
    (state) => state.actionsReducer.VMValidatedActions
  );
  // Speaker Actions state from redux store
  const speakerActions = useSelector(
    (state) => state.actionsReducer.speakerActions
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
      fetchActions();
    });
  }, []);
  useEffect(() => {
    fetchNotifications();
    fetchActions();
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
  const fetchActions = async () => {
    if (user.length) {
      let isCancelled = false;
      if (!isCancelled) {
        if (user[0].user_position === "DSM") {
          dispatch(getVMActionsByUserId(user[0].user_id));
        } else if (user[0].user_position === "CDP") {
          dispatch(getVMValidatedActionsByUserId(user[0].user_id));
          dispatch(getSpeakerActions());
        } else if (user[0].user_position === "MED") {
          dispatch(getSpeakerActions());
        }
        else {
          dispatch(getActionByUserId(user[0].user_id));
        }
      }
      return () => (isCancelled = true);
    }
  }

  useEffect(() => {
    let values = {};
    let VMprevalence = false;
    let DSMprevalence = false;
    let CDPprevalence = false;
    let MEDprevalence = false;
    let twoDays = 1000 * 60 * 60 * 24 * 2;
    values.recieved_since = new Date();
    if (user.length) {
      if (user[0].user_position === "VM") {
        values.notification_sender = user[0].user_id;
        values.VM_supervisor = user[0].user_id;
        values.DSM_supervisor = null;
        values.CDP_supervisor = null;
        values.notification_name = `Veuillez archiver votre actions terminées et non archivées SVP!..`
        actionsUser.map((element, key) => {
          if (element.status === "Terminée et non archivée") {
            VMprevalence = true;
          }
        })
        if (VMprevalence) {
          setInterval(() => {
            dispatch(addMail(user[0].user_email));
            dispatch(pushNotification(values));
          }, twoDays)
        }
      }
      else if (user[0].user_position === "DSM") {
        values.notification_sender = user[0].user_id;
        values.VM_supervisor = null;
        values.DSM_supervisor = user[0].user_id;
        values.CDP_supervisor = null;
        values.notification_name = `Veuillez valider ou bien rejeter les actions en attente!..`
        VMActions.map((element, key) => {
          if (element.status === "En attente de validation DSM") {
            DSMprevalence = true;
          }
        })
        if (DSMprevalence) {
          setInterval(() => {
            dispatch(addMail(user[0].user_email));
            dispatch(pushNotification(values));
          }, twoDays)
        }
      }
      else if (user[0].user_position === "CDP") {
        values.notification_sender = user[0].user_id;
        values.VM_supervisor = null;
        values.DSM_supervisor = null;
        values.CDP_supervisor = user[0].user_id;
        values.notification_name = `Veuillez valider ou bien rejeter les actions en attente!..`
        VMValidatedActions.map((element, key) => {
          if (element.status === "En attente de validation CDP" || element.status === "En attente de validation CDP et MED") {
            CDPprevalence = true;
          }
        })
        if (CDPprevalence) {
          setInterval(() => {
            dispatch(addMail(user[0].user_email));
            dispatch(pushNotification(values));
          }, twoDays)
        }
      }
      else if (user[0].user_position === "MED") {
        values.notification_sender = user[0].user_id;
        values.VM_supervisor = null;
        values.DSM_supervisor = null;
        values.MED_supervisor = user[0].user_id;
        values.notification_name = `Veuillez valider ou bien rejeter les actions en attente!..`
        VMValidatedActions.map((element, key) => {
          if (element.status === "En attente de validation MED" || element.status === "En attente de validation CDP et MED") {
            MEDprevalence = true;
          }
        })
        if (MEDprevalence) {
          setInterval(() => {
            dispatch(addMail(user[0].user_email));
            dispatch(pushNotification(values));
          }, twoDays)
        }
      }
    }
  }, [dispatch, actionsUser, VMActions, VMValidatedActions, speakerActions, user]);
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
