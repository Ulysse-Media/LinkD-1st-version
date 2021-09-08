import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import {
  Avatar,
} from '@material-ui/core';
import { connect } from "react-redux";
import { logoutAuthUser } from "../../../../actions/auth-actions/actions";


class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      username: "",
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  handleLogout() {
    this.props.logoutUser();
  }

  componentDidMount() {
    try {
      if (this.props.user.length > 0) {
        this.setState({ username: this.props.user[0].user_email.split("@").shift() })
        this.setState({ user_avatar: this.props.user[0].user_avatar })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <Avatar alt="Knaizia Yassine" className="user-avatar rounded-circle mr-2" src={this.state.user_avatar} />
          <span className="d-none d-md-inline-block">{this.state.username}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Mon profil
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Mes paramétres
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Confidentialité
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> A propos
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.handleLogout} tag={Link} to="/" className="text-danger">
          <i className="material-icons">power_settings_new</i> Déconnextion
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
// Map state to Props
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutAuthUser())
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
