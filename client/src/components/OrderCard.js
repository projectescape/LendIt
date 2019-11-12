import React from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import moment from "moment";
import { returnItem } from "../actions";
import { connect } from "react-redux";

class OrderCard extends React.Component {
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
    return "Return";
  }

  renderReturnDate = () => {
    if (this.props.order.status === "returned") {
      return (
        <div>{`Returned On: ${moment(this.props.order.returned_at).format(
          "dddd, Do MMMM, YY "
        )}`}</div>
      );
    }
    return (
      <div>{`Return Date: ${moment(this.props.order.created_at)
        .add(this.props.order.quantity, "months")
        .format("dddd, Do MMMM, YY ")}`}</div>
    );
  };

  renderSubmit = () => {
    if (this.props.order.status === "lent") {
      return (
        <Button
          variant="info"
          block
          className="mt-3"
          onClick={async () => {
            this.setState({ loading: true });
            await this.props.returnItem(this.props.order.id);
            this.setState({ loading: false });
          }}
        >
          {this.renderButtonContent()}
        </Button>
      );
    }
    return null;
  };
  renderOrders = () => {
    return (
      <>
        <Card>
          <Card.Header className="text-muted">{`Order id : #${this.props.order.id}`}</Card.Header>
          <Card.Body>
            <Card.Title>{this.props.order.item}</Card.Title>
            {/* <Card.Text> */}
            <div>{`Rent Duration : ${this.props.order.quantity} month`}</div>
            {this.renderReturnDate()}
            <div>{`Status : ${this.props.order.status}`}</div>
            {/* </Card.Text> */}
            {this.renderSubmit()}
          </Card.Body>

          <Card.Footer className="">
            Ordered{" "}
            {moment(this.props.order.created_at).format("dddd, Do MMMM, YY ")}
          </Card.Footer>
        </Card>
      </>
    );
  };

  render() {
    return <>{this.renderOrders()}</>;
  }
}

export default connect(null, { returnItem })(OrderCard);
