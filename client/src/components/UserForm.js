import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router";
import { fetchUser } from "../actions";

class UserForm extends React.Component {
  state = {
    age: this.props.auth.age,
    mobile: this.props.auth.mobile,
    address: this.props.auth.address,
    firstName: this.props.auth.firstName,
    lastName: this.props.auth.lastName
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
    await axios.put("/api/user", {
      ...this.state
    });
    await this.props.fetchUser();
    this.props.history.push("/");
  };

  renderHeading() {
    if (this.props.auth.mobile === null) return "Complete User Details";
    return "Edit Details";
  }

  renderNameInput() {
    if (this.props.auth.mobile === null) {
      return null;
    }
    return (
      <>
        <Form.Group controlId="formGroupFirst">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            placeholder="Enter First Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formGroupSecond">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            placeholder="Enter Last Name"
            required
          />
        </Form.Group>
      </>
    );
  }

  render() {
    return (
      <>
        <h2>{this.renderHeading()}</h2>
        <Form className="bg-light p-3" onSubmit={this.handleSubmit}>
          {this.renderNameInput()}
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={this.state.age}
              onChange={this.handleInputChange}
              placeholder="Enter Age"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Phone Number</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                aria-describedby="inputGroupPrepend"
                name="mobile"
                placeholder="Enter phone number"
                value={this.state.mobile}
                onChange={this.handleInputChange}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="address"
              placeholder="Enter Address"
              value={this.state.address}
              onChange={this.handleInputChange}
              required
            />
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

const stateToProps = state => {
  return {
    auth: state.auth
  };
};

export default withRouter(connect(stateToProps, { fetchUser })(UserForm));
