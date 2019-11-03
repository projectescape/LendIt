import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { Container } from "react-bootstrap";
import Header from "./Header";

import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    // return <a href="/auth/google">Login With Google</a>;
    return (
      <BrowserRouter>
        <Header />
        <Container></Container>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
