import React from "react";
import PageTitle from "../../../common/PageTitle";
import { Row } from "shards-react";
import {
    Paper,
} from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/fr';
import { useSelector } from "react-redux";

const ViewNotifications = () => {
    // User state from redux store
    const user = useSelector(
        (state) => state.authReducer.user[0]
    );
    // Notifications VM state from redux store
    const notifications_VM_supervisor = useSelector(
        (state) => state.notificationsReducer.notifications_VM_supervisor
    );
    // Notifications DSM state from redux store
    const notifications_DSM_supervisor = useSelector(
        (state) => state.notificationsReducer.notifications_DSM_supervisor
    );
    // Notifications CDP state from redux store
    const notifications_CDP_supervisor = useSelector(
        (state) => state.notificationsReducer.notifications_CDP_supervisor
    );
    // Notifications MED state from redux store
    const notifications_MED_supervisor = useSelector(
        (state) => state.notificationsReducer.notifications_MED_supervisor
    );
    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1225 }}>
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Notifications" subtitle="Link-D / Notifications" />
            </Row>
            <Paper style={{ padding: 16 }}>
                {user.user_position === 'VM' && notifications_VM_supervisor.map((element, key) => {
                    return (
                        <div>
                            <ul>
                                <li key={key}>{element.notification_name} <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span></li>
                            </ul>
                        </div>
                    )
                })}
                {user.user_position === 'DSM' && notifications_DSM_supervisor.map((element, key) => {
                    return (
                        <div>
                            <ul>
                                <li key={key}>{element.notification_name} <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span></li>
                            </ul>
                        </div>
                    )
                })}
                {user.user_position === 'CDP' && notifications_CDP_supervisor.map((element, key) => {
                    return (
                        <div>
                            <ul>
                                <li key={key}>{element.notification_name} <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span></li>
                            </ul>
                        </div>
                    )
                })}
                {user.user_position === 'MED' && notifications_MED_supervisor.map((element, key) => {
                    return (
                        <div>
                            <ul>
                                <li key={key}>{element.notification_name} <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span></li>
                            </ul>
                        </div>
                    )
                })}
            </Paper>
        </div>
    );
}

export default ViewNotifications;