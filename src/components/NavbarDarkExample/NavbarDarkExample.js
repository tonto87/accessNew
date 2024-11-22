import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavbarDarkExample.css";

function NavbarDarkExample() {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="NavbarDarkExample">
      <Container fluid>
        <Navbar id="navbar-dark-example">
          <Nav className="flex-column">
            <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
              Dashboard
            </Navbar.Brand>
            
            {/* Offices & Departments */}
            <div className="offices-and-departments">
              <div className="section-title">Offices and Departments</div>
              <NavDropdown title="Offices" id="nav-dropdown-offices" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/offices/all">All</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/offices/add">Add</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Departments" id="nav-dropdown-departments" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/departments/list">All</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/departments/add">Add</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Rooms" id="nav-dropdown-rooms" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/rooms/list">List</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/rooms/add">Add</NavDropdown.Item>
              </NavDropdown>
            </div>

            {/* Meet Section */}
            <div className="meet-section">
              <div className="section-title">Meet</div>
              <NavDropdown title="Meets" id="nav-dropdown-meets" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/meets/all">All</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/meets/upcoming">Upcoming</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/meets/report">Report</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/meets/add">Add</NavDropdown.Item>
              </NavDropdown>
            </div>

            {/* Visitors Section */}
            <div className="visitors-section">
              <div className="section-title">Visitors</div>
              <NavDropdown title="Visitors" id="nav-dropdown-visitors" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/visitors/all">All</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/visitors/add">Add</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/visitors/report">Report</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Person Non Grata" id="nav-dropdown-person-non-grata" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/visitors/persona/all">Person Non Grata</NavDropdown.Item>
              </NavDropdown>
            </div>

            {/* Site Section */}
            <div className="site-section">
              <div className="section-title">Site</div>
              <NavDropdown title="Site" id="nav-dropdown-site" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/site/settings">Site Settings</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Translations" id="nav-dropdown-translations" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/site/translations">Translations</NavDropdown.Item>
              </NavDropdown>
            </div>

            {/* Users & Permissions Section */}
            <div className="users-permissions-section">
              <div className="section-title">Users & Permissions</div>
              <NavDropdown title="Users" id="nav-dropdown-users" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/users/permissions/list">List</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/users/permissions/add-user">Add</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Permissions" id="nav-dropdown-permissions" menuVariant="dark">
                <NavDropdown.Item as={NavLink} to="/users/permissions/all">All</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/users/permissions/add">Add</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default NavbarDarkExample;
