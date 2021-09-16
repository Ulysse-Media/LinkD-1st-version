import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

const NavbarNav = ({ VM_notif, DSM_notif, CDP_notif, MED_notif, notes }) => {
 return (
    <Nav navbar className="border-left flex-row">
      <Notifications notes={notes} VM_notif={VM_notif} DSM_notif={DSM_notif} CDP_notif={CDP_notif} MED_notif={MED_notif}/>
      <UserActions />
    </Nav>
  );
}

export default NavbarNav;