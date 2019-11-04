import React from "react";
import { Card, Button, Collapse } from "react-bootstrap";

class ItemCard extends React.Component {
  state = {
    open: false,
    setOpen: false
  };
  renderDescription(item) {
    if (this.props.item.description === "") return null;
    return (
      <>
        <Button
          className="btn-secondary btn-block "
          style={{ borderRadius: "0" }}
          onClick={() => this.setState({ open: !this.state.open })}
          aria-controls="example-collapse-text"
          aria-expanded={this.state.open}
        >
          Description
        </Button>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text">{this.props.item.description}</div>
        </Collapse>
      </>
    );
  }

  render() {
    return (
      <Card>
        <Card.Img variant="top" src="https://source.unsplash.com/random" />
        <Card.Body>
          <Card.Title className="diplay-4">{this.props.item.name}</Card.Title>
          <Card.Text className="text-success font-weight-bold">
            ₹ {this.props.item.price} per month
          </Card.Text>
          {this.renderDescription()}
          <Button variant="primary btn-block btn-info mt-2">Place Order</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default ItemCard;
