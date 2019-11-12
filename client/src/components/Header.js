import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchUser } from "../actions";
import Cart from "./Cart";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

class Header extends React.Component {
  navContent() {
    if (this.props.auth === false || this.props.auth === null) {
      return <Nav.Link href="/auth/google">Login</Nav.Link>;
    }

    return (
      <>
        <Cart />
        <NavDropdown
          title={"Welcome " + this.props.auth.firstName}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item
            onClick={() => {
              this.props.history.push("/orders");
            }}
          >
            Orders
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              this.props.history.push("/user/edit");
            }}
          >
            Edit User
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              this.props.history.push("/add/item");
            }}
          >
            Add Items
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={async () => {
              await fetch("/api/logout");
              this.props.fetchUser();
            }}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            LendIt
          </Navbar.Brand>
          <Nav className="ml-auto">{this.navContent()}</Nav>
        </Container>
      </Navbar>
    );
  }
}

const stateToProps = state => {
  return { auth: state.auth };
};

export default withRouter(connect(stateToProps, { fetchUser })(Header));
