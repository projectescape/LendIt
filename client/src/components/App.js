import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { Container } from "react-bootstrap";
import Header from "./Header";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ItemForm from "./ItemForm";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    // return <a href="/auth/google">Login With Google</a>;
    return (
      <BrowserRouter>
        <Header />
        <Container className="mt-3">
          <Switch>
            <Route path="/add/item">
              <ItemForm />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
