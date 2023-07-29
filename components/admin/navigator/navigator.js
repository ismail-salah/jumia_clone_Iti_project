import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function Navigator() {
  const token = localStorage.getItem("AdminToken");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("AdminToken");
    // Redirect to the login page
    window.location.href = "/loginadmin";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/admin">Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/userslist">Users List</Nav.Link>
          <Nav.Link href="/productsList">Products List</Nav.Link>
          <Nav.Link href="/ordersList">Orders List</Nav.Link>
          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <Nav.Link href="/loginadmin">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigator;
