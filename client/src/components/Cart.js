import React from "react";
import { connect } from "react-redux";
import {
  Popover,
  OverlayTrigger,
  Nav,
  Table,
  ButtonGroup,
  Button,
  Spinner
} from "react-bootstrap";
import { editQuantityCart, placeOrder } from "../actions";
import { withRouter } from "react-router-dom";

class Cart extends React.Component {
  state = { loading: false };

  renderButtonContent() {
    if (this.state.loading)
      return (
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
        />
      );
    return "Place Order";
  }

  cartContent() {
    return this.props.cart.map((item, index) => (
      <tr key={item.id}>
        <td className="text-center">
          <h4>{index + 1}</h4>
        </td>
        <td className="text-center">
          <h4>{item.name}</h4>
        </td>
        <td className="text-center">
          <h4>₹ {item.price * item.quantity}</h4>
        </td>
        <td>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => {
                this.props.editQuantityCart({ id: item.id, value: 1 });
              }}
            >
              ▲
            </Button>
            <Button variant="outline-dark" size="sm">
              {item.quantity}
            </Button>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => {
                this.props.editQuantityCart({ id: item.id, value: -1 });
              }}
            >
              ▼
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ));
  }

  renderSubmit() {
    if (this.props.cart.length === 0) {
      return <h4 style={{ textAlign: "center", width: "100%" }}>Cart Empty</h4>;
    }
    return (
      <Button
        variant="info"
        block
        onClick={async () => {
          this.setState({ loading: true });
          await this.props.placeOrder();
          await this.props.history.push("/orders");
          this.setState({ loading: false });
        }}
      >
        {this.renderButtonContent()}
      </Button>
    );
  }

  popover = () => (
    <Popover id="popover-basic" style={{ maxWidth: "none" }}>
      <Popover.Content>
        <Table striped size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Effective Price</th>
              <th>No. of Months</th>
            </tr>
          </thead>
          <tbody>{this.cartContent()}</tbody>
        </Table>
        {this.renderSubmit()}
      </Popover.Content>
    </Popover>
  );
  render() {
    return (
      <>
        <OverlayTrigger
          trigger={["click"]}
          placement="bottom"
          overlay={this.popover()}
        >
          <Nav.Link style={{ outline: 0 }}>Cart</Nav.Link>
        </OverlayTrigger>
      </>
    );
  }
}

const stateToProps = state => ({
  cart: state.cart
});

export default withRouter(
  connect(stateToProps, { editQuantityCart, placeOrder })(Cart)
);
