
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import { pushNotification } from "../actions/notifications-actions/actions";
import { getActionByUserId, getVMActionsByUserId, getVMValidatedActionsByUserId, getSpeakerActions, disarchiveActionById } from "../actions/actions-initiation-actions/actions";
import { addVMMailing, addSupervisorsMailing } from "../actions/mailing-actions/actions";
import { getNotificationsByVMsupervisor, getNotificationsByDSMsupervisor, getNotificationsByCDPsupervisor, getNotificationsByMEDsupervisor } from "../actions/notifications-actions/actions";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
const SERVER = "http://localhost:3001";
const socket = io(SERVER, { transports: ["websocket", "polling"] });

const DefaultLayout = ({ children, noNavbar, noFooter }) => {
  const dispatch = useDispatch();
  const [ArchivedVMactions, setArchivedVMactions] = useState([]);
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
  // MED Notifications state from redux store
  const MED_notif = useSelector(
    (state) => state.notificationsReducer.notifications_MED_supervisor
  );
  // Notes state from redux store
  const notes = useSelector(
    (state) => state.notesReducer.notesActionSender
  );
  useEffect(() => {
    const now = new Date();
    let newAction = [];
    if (user[0].user_position === "VM") {
        for (var i = 0; i < actionsUser.length; i++) {
            if (now.getTime() - new Date(actionsUser[i].start_action).getTime() > 0) {
                newAction.push(actionsUser[i]);
            }
        }
        setArchivedVMactions(newAction);
        for (var j = 0; j < newAction.length; j++) {
            if (newAction[j].status === "Validé") {
                dispatch(disarchiveActionById(newAction[j].action_id));
            }
        }
    }
    // if (user.user_position === "DSM" && ArchivedDSMactions.length === 0) {
    //     if (VMActions.length > 0) {
    //         for (var k = 0; i < VMActions.length; k++) {
    //             if (now.getTime() - new Date(VMActions[k].start_action).getTime() > 0) {
    //                 newAction.push(VMActions[k]);
    //             }
    //         }
    //         setArchivedDSMactions(newAction);
    //         for (var l = 0; j < ArchivedDSMactions.length; l++) {
    //             if (ArchivedDSMactions[l].status === "Validé") {
    //                 dispatch(disarchiveActionById(ArchivedDSMactions[l].action_id));
    //             }
    //         }
    //     }
    // }
    // if (user.user_position === "CDP" && ArchivedCDPactions.length === 0) {
    //     if (VMValidatedActions.length > 0) {
    //         for (var m = 0; m < VMValidatedActions.length; m++) {
    //             if (now.getTime() - new Date(VMValidatedActions[m].start_action).getTime() > 0) {
    //                 newAction.push(VMValidatedActions[m]);
    //             }
    //         }
    //         setArchivedCDPactions(newAction);
    //         for (var n = 0; n < ArchivedCDPactions.length; n++) {
    //             if (ArchivedCDPactions[n].status === "Validé") {
    //                 dispatch(disarchiveActionById(ArchivedCDPactions[n].action_id));
    //             }
    //         }
    //     }
    // }
    // if (user.user_position === "MED" && ArchivedMEDactions.length === 0) {
    //     if (speakerActions.length > 0) {
    //         for (var p = 0; p < speakerActions.length; p++) {
    //             if (now.getTime() - new Date(speakerActions[p].start_action).getTime() > 0) {
    //                 newAction.push(speakerActions[p]);
    //             }
    //         }
    //         setArchivedMEDactions(newAction);
    //         for (var q = 0; q < ArchivedMEDactions.length; q++) {
    //             if (ArchivedMEDactions[q].status === "Validé") {
    //                 dispatch(disarchiveActionById(ArchivedMEDactions[q].action_id));
    //             }
    //         }
    //     }
    // }
}, [dispatch, VMActions, VMValidatedActions, actionsUser, speakerActions]);
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
      } else if (user[0].user_position === "MED") {
        dispatch(getNotificationsByMEDsupervisor(user[0].user_id));
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
    // let DSMprevalence = false;
    // let CDPprevalence = false;
    // let MEDprevalence = false;
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
            dispatch(addVMMailing(user[0].user_email));
            dispatch(pushNotification(values));
          }, twoDays)
        }
      }
      // else if (user[0].user_position === "DSM") {
      //   values.notification_sender = user[0].user_id;
      //   values.VM_supervisor = null;
      //   values.DSM_supervisor = user[0].user_id;
      //   values.CDP_supervisor = null;
      //   values.notification_name = `Veuillez agir sur les actions en attente SVP!..`
      //   VMActions.map((element, key) => {
      //     if (element.status === "En attente de validation DSM") {
      //       DSMprevalence = true;
      //     }
      //   })
      //   if (DSMprevalence) {
      //     setInterval(() => {
      //       dispatch(addSupervisorsMailing(user[0].user_email));
      //       dispatch(pushNotification(values));
      //     }, twoDays)
      //   }
      // }
      // else if (user[0].user_position === "CDP") {
      //   values.notification_sender = user[0].user_id;
      //   values.VM_supervisor = null;
      //   values.DSM_supervisor = null;
      //   values.CDP_supervisor = user[0].user_id;
      //   values.notification_name = `Veuillez agir sur les actions en attente SVP!..`
      //   VMValidatedActions.map((element, key) => {
      //     if (element.status === "En attente de validation CDP" || element.status === "En attente de validation CDP et MED") {
      //       CDPprevalence = true;
      //     }
      //   })
      //   if (CDPprevalence) {
      //     setInterval(() => {
      //       dispatch(addSupervisorsMailing(user[0].user_email));
      //       dispatch(pushNotification(values));
      //     }, twoDays)
      //   }
      // }
      // else if (user[0].user_position === "MED") {
      //   values.notification_sender = user[0].user_id;
      //   values.VM_supervisor = null;
      //   values.DSM_supervisor = null;
      //   values.MED_supervisor = user[0].user_id;
      //   values.notification_name = `Veuillez agir sur les actions en attente SVP!..`
      //   VMValidatedActions.map((element, key) => {
      //     if (element.status === "En attente de validation MED" || element.status === "En attente de validation CDP et MED") {
      //       MEDprevalence = true;
      //     }
      //   })
      //   if (MEDprevalence) {
      //     setInterval(() => {
      //       dispatch(addSupervisorsMailing(user[0].user_email));
      //       dispatch(pushNotification(values));
      //     }, twoDays)
      //   }
      // }
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
          {!noNavbar && <MainNavbar notes={notes} VM_notif={VM_notif} DSM_notif={DSM_notif} CDP_notif={CDP_notif} MED_notif={MED_notif}/>}
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
