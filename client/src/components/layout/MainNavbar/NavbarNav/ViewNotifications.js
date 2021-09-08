import React from "react";
import PageTitle from "../../../common/PageTitle";
import { Row } from "shards-react";
import {
    Paper,
} from '@material-ui/core';
import 'moment/locale/fr';

const ViewNotifications = () => {
    // Notifications state from redux store
    // const notifications = useSelector(
    //     (state) => state.notificationsReducer.notifications
    // );
    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1225 }}>
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Notifications" subtitle="Link-D / Notifications" />
            </Row>
            <Paper style={{ padding: 16 }}>
                {/* {notifications.map((element, key) => {
                    return (
                        <li key={key}>{element.notification_name} <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span></li>
                    )
                })} */}
            </Paper>
        </div>
    );
}

export default ViewNotifications;