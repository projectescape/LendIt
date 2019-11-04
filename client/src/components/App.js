import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { Container } from "react-bootstrap";
import Header from "./Header";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import OrderList from "./OrderList";
import UserForm from "./UserForm";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  renderRoot() {
    if (this.props.auth === false || this.props.auth === null) {
      // Replace with Landing
      return null;
    } else {
      if (this.props.auth.mobile === null) {
        return <Redirect to="/user/edit" />;
      }
      return <ItemList />;
    }
  }
  render() {
    // return <a href="/auth/google">Login With Google</a>;
    return (
      <BrowserRouter>
        <Header />
        <Container className="mt-3">
          <Switch>
            <Route path="/" exact>
              {this.renderRoot()}
            </Route>
            <Route path="/user/edit" exact>
              <UserForm />
            </Route>
            <Route path="/orders" exact>
              <OrderList />
            </Route>
            <Route path="/add/item">
              <ItemForm />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

const stateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  stateToProps,
  { fetchUser }
)(App);
