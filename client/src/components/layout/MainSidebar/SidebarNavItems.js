import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)
// Local state
    this.state = {
      navItems: Store.getSidebarItems()
    };

    this.onChange = this.onChange.bind(this);
  }
// Component on mount
  componentDidMount() {
    Store.addChangeListener(this.onChange);
  }
// Component on unmount
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }
// On change function
  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
