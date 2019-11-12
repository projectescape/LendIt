import React from "react";
import { fetchOrders } from "../actions/index";
import { connect } from "react-redux";
import { Card, Button, Spinner } from "react-bootstrap";
import moment from "moment";
import { returnItem } from "../actions";

class OrderList extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderReturnDate = order => {
    if (order.status === "returned") {
      return (
        <div>{`Returned On: ${moment(order.returned_at)
          .add(order.quantity, "months")
          .format("dddd, Do MMMM, YY ")}`}</div>
      );
    }
    return (
      <div>{`Return Date: ${moment(order.created_at)
        .add(order.quantity, "months")
        .format("dddd, Do MMMM, YY ")}`}</div>
    );
  };

  renderSubmit = order => {
    if (order.status === "lent") {
      return (
        <Button
          variant="info"
          block
          className="mt-3"
          onClick={async () => {
            await this.props.returnItem(order.id);
            // this.setState({});
          }}
        >
          Return
        </Button>
      );
    }
    return null;
  };
  renderOrders = () => {
    if (this.props.orders === null) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" size="lg" />
        </div>
      );
    }

    return (
      <>
        {this.props.orders.map(order => {
          return (
            <div key={order.id} className="mb-3 p-3 w-50 d-inline-block">
              <Card>
                <Card.Header className="text-muted">{`Order id : #${order.id}`}</Card.Header>
                <Card.Body>
                  <Card.Title>{order.item}</Card.Title>
                  {/* <Card.Text> */}
                  <div>{`Rent Duration : ${order.quantity} month`}</div>
                  {this.renderReturnDate(order)}
                  <div>{`Status : ${order.status}`}</div>
                  {/* </Card.Text> */}
                  {this.renderSubmit(order)}
                </Card.Body>

                <Card.Footer className="">
                  Ordered{" "}
                  {moment(order.created_at).format("dddd, Do MMMM, YY ")}
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </>
    );
  };

  render() {
    return <>{this.renderOrders()}</>;
  }
}

const stateToProps = state => ({
  orders: state.orders
});

export default connect(stateToProps, { fetchOrders, returnItem })(OrderList);
