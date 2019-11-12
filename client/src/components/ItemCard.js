import React from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import moment from "moment";
import { connect } from "react-redux";
import { addToCart, removeFromCart, toggleCart } from "../actions";

class ItemCard extends React.Component {
  state = {
    open: false,
    setOpen: false
  };
  renderDescription() {
    if (this.props.item.description === "") return null;
    return (
      <>
        <Button
          className="btn-secondary btn-block "
          onClick={() => this.setState({ open: !this.state.open })}
          aria-controls="example-collapse-text"
          aria-expanded={this.state.open}
        >
          Description
        </Button>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text " style={{ whiteSpace: "pre-line" }}>
            {this.props.item.description}
          </div>
        </Collapse>
      </>
    );
  }

  renderCartButton() {
    if (this.props.item.status === "inCart") {
      return (
        <Button
          variant="danger btn-block btn-info mt-3 disabled"
          onClick={() => {
            this.props.removeFromCart({ id: this.props.item.id });
            this.props.toggleCart({ id: this.props.item.id });
            this.setState({});
          }}
        >
          Remove from Cart
        </Button>
      );
    }
    return (
      <Button
        variant="primary btn-block btn-info mt-3"
        onClick={() => {
          this.props.addToCart({
            id: this.props.item.id,
            name: this.props.item.name,
            price: this.props.item.price
          });
          this.props.toggleCart({ id: this.props.item.id });
          this.setState({});
        }}
      >
        Add to Cart
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <Card.Img variant="top" src={this.props.item.image} />
        <Card.Body>
          <Card.Title className="diplay-4">{this.props.item.name}</Card.Title>
          <Card.Text className="text-success font-weight-bold">
            ₹ {this.props.item.price} per month
          </Card.Text>
          {this.renderDescription()}
          {this.renderCartButton()}
        </Card.Body>
        <Card.Footer className="text-muted">
          Added{" "}
          {moment(this.props.item.updated_at, "YYYY-MM-DD HH:mm:ss").fromNow()}
        </Card.Footer>
      </Card>
    );
  }
}

export default connect(null, {
  addToCart,
  removeFromCart,
  toggleCart
})(ItemCard);
