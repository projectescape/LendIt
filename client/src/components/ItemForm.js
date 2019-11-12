import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router";
import { fetchItems } from "../actions";
import { connect } from "react-redux";

class ItemForm extends React.Component {
  state = {
    itemName: "",
    price: null,
    description: "",
    image: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    await axios
      .post("/api/items", {
        price: this.state.price,
        description: this.state.description,
        name: this.state.itemName,
        image: this.state.image
      })
      .then(() => {
        this.props.fetchItems();
        this.props.history.push("/");
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <>
        <h2>Add Items</h2>
        <Form className="bg-light p-3" onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="itemName"
              value={this.state.itemName}
              onChange={this.handleInputChange}
              placeholder="Enter Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGroupEImage">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleInputChange}
              placeholder="Enter Image URL"
              required
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="description"
              placeholder="Enter Description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
            {this.state.description === "" ? (
              <Form.Text className="text-muted">
                Although not necessary, adding a description can help reach more
                people.
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Price per month</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">₹</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                aria-describedby="inputGroupPrepend"
                name="price"
                placeholder="Enter price/month"
                value={this.state.price}
                onChange={this.handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Number.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Button type="submit" className="btn-block">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </>
    );
  }
}

export default withRouter(connect(null, { fetchItems })(ItemForm));
