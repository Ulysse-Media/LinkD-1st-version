import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { markAsReadNotificationsByVMsupervisor, markAsReadNotificationsByDSMsupervisor, markAsReadNotificationsByCDPsupervisor } from "../../../../actions/notifications-actions/actions";
import moment from "moment";
import 'moment/locale/fr';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsVM_supervisor: [],
      notificationsDSM_supervisor: [],
      notificationsCDP_supervisor: [],
      notificationsMED_supervisor: [],
      user: {},
      notesActionSender: [],
      alertNotif: {},
      VM_counter: 0,
      DSM_counter: 0,
      CDP_counter: 0,
      MED_counter: 0,
      showCounter: true,
      visible: false
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  // Function to toggle notifications state in open and close //
  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
    this.setState({
      showCounter: false
    });
  }
  // Component on mount
  componentDidMount() {
    if (this.props.user.length) {
      this.setState({ user: this.props.user[0] })
    }
  }
  // Component will recieve props //
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.user.user_position === "VM") {
      let notificationsVM_supervisor = nextProps.VM_notif.reverse();
      let filteredNotificationsVM_supervisor = notificationsVM_supervisor.filter(element => element.markAsRead_VM_supervisor === 0);
      let VM_counter = filteredNotificationsVM_supervisor.length;
      this.setState({ notificationsVM_supervisor });
      this.setState({ VM_counter });
    } else if (this.state.user.user_position === "DSM") {
      let notificationsDSM_supervisor = nextProps.DSM_notif.reverse();
      let filteredNotificationsDSM_supervisor = notificationsDSM_supervisor.filter(element => element.markAsRead_DSM_supervisor === 0);
      let DSM_counter = filteredNotificationsDSM_supervisor.length;
      this.setState({ notificationsDSM_supervisor });
      this.setState({ DSM_counter });
    } else if (this.state.user.user_position === "CDP") {
      let notificationsCDP_supervisor = nextProps.CDP_notif.reverse();
      let filteredNotificationsCDP_supervisor = notificationsCDP_supervisor.filter(element => element.markAsRead_CDP_supervisor === 0);
      let CDP_counter = filteredNotificationsCDP_supervisor.length;
      this.setState({ notificationsCDP_supervisor });
      this.setState({ CDP_counter });
    } else if (this.state.user.user_position === "MED") {
      let notificationsMED_supervisor = nextProps.MED_notif.reverse();
      let filteredNotificationsMED_supervisor = notificationsMED_supervisor.filter(element => element.markAsRead_MED_supervisor === 0);
      let MED_counter = filteredNotificationsMED_supervisor.length;
      this.setState({ notificationsMED_supervisor });
      this.setState({ MED_counter });
    }
  }
  // Component will update //
  componentDidUpdate() {
    let notificationsVM_supervisor = this.state.notificationsVM_supervisor;
    let notificationsDSM_supervisor = this.state.notificationsDSM_supervisor;
    let notificationsCDP_supervisor = this.state.notificationsCDP_supervisor;
    if (this.state.user.user_position === "VM") {
      if (this.state.visible) {
        for (let i = 0; i < notificationsVM_supervisor.length; i++) {
          if (notificationsVM_supervisor[i].markAsRead_VM_supervisor === 0) {
            this.props.markAsReadNotificationsByVMsupervisor(notificationsVM_supervisor[i].notification_id)
          }
        }
      }
    } else if (this.state.user.user_position === "DSM") {
      if (this.state.visible) {
        for (let i = 0; i < notificationsDSM_supervisor.length; i++) {
          if (notificationsDSM_supervisor[i].markAsRead_DSM_supervisor === 0) {
            this.props.markAsReadNotificationsByDSMsupervisor(notificationsDSM_supervisor[i].notification_id)
          }
        }
      }
    } else if (this.state.user.user_position === "CDP") {
      if (this.state.visible) {
        for (let i = 0; i < notificationsCDP_supervisor.length; i++) {
          if (notificationsCDP_supervisor[i].markAsRead_CDP_supervisor === 0) {
            this.props.markAsReadNotificationsByCDPsupervisor(notificationsCDP_supervisor[i].notification_id)
          }
        }
      }
    }
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            {this.state.showCounter && this.state.VM_counter !== 0 && (
              <Badge pill theme="danger" className="notifications-badge">
                {this.state.VM_counter}+
              </Badge>
            )}
            {this.state.showCounter && this.state.DSM_counter !== 0 && (
              <Badge pill theme="danger" className="notifications-badge">
                {this.state.DSM_counter}+
              </Badge>
            )}
            {this.state.showCounter && this.state.CDP_counter !== 0 && (
              <Badge pill theme="danger" className="notifications-badge">
                {this.state.CDP_counter}+
              </Badge>
            )}
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className={this.state.notificationsVM_supervisor.length || this.state.notificationsDSM_supervisor.length || this.state.notificationsCDP_supervisor.length ? "dropdown-menu dropdown-menu-small notif" : "dropdown-menu dropdown-menu-small no-notif"}
        >
          {this.state.user.user_position === "VM" && this.state.notificationsVM_supervisor.length && this.state.notificationsVM_supervisor.slice(0, 5).map((element, key) => {
            return (
              <DropdownItem key={key}><div>
                <span>{element.notification_name}</span><br></br>
                <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span>
              </div></DropdownItem>
            )
          })}
          {this.state.user.user_position === "DSM" && this.state.notificationsDSM_supervisor.length && this.state.notificationsDSM_supervisor.slice(0, 5).map((element, key) => {
            return (
              <DropdownItem key={key}><div>
                <span>{element.notification_name}</span><br></br>
                <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span>
              </div></DropdownItem>
            )
          })}
          {this.state.user.user_position === "CDP" && this.state.notificationsCDP_supervisor.length && this.state.notificationsCDP_supervisor.slice(0, 5).map((element, key) => {
            return (
              <DropdownItem key={key}><div>
                <span>{element.notification_name}</span><br></br>
                <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span>
              </div></DropdownItem>
            )
          })}
          {this.state.user.user_position === "MED" && this.state.notificationsMED_supervisor.length && this.state.notificationsMED_supervisor.slice(0, 5).map((element, key) => {
            return (
              <DropdownItem key={key}><div>
                <span>{element.notification_name}</span><br></br>
                <span className="time-left">Il y a {(moment(new Date()).from(new Date(element.recieved_since))).split("dans")}</span>
              </div></DropdownItem>
            )
          })}
          <DropdownItem tag={Link} to="all-notifications" className="notification__all text-center">
            Toutes les notifications
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authReducer.user,
    lastNotification: state.notificationsReducer.lastNotification,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    markAsReadNotificationsByVMsupervisor: (notification_id) => dispatch(markAsReadNotificationsByVMsupervisor(notification_id)),
    markAsReadNotificationsByDSMsupervisor: (notification_id) => dispatch(markAsReadNotificationsByDSMsupervisor(notification_id)),
    markAsReadNotificationsByCDPsupervisor: (notification_id) => dispatch(markAsReadNotificationsByCDPsupervisor(notification_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);