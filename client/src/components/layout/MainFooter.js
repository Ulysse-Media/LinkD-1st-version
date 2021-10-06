import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row>
        <Nav>
          {menuItems.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink tag={Link} to={item.to}>
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        {/* <span style={{ textAlign: 'center' }} className="copyright ml-auto my-auto mr-2">{copyright}</span> */}
        </Nav>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "Tout droits réservés Multiprod Tunisia en partenariat Pro LV Maroc. © 2021",
  menuItems: [
    {
      title: "Dashboard",
      to: "/dashboard"
    },
    {
      title: "Initiation Action",
      to: "/initiation-action"
    },
    {
      title: "Suivi Action",
      to: "/monitoring-action"
    },
    {
      title: "Validation Action",
      to: "/action-validation"
    },
    {
      title: "Archivage Action",
      to: "/action-archiving"
    },
  ]
};

export default MainFooter;
