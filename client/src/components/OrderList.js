import React from "react";
import { fetchOrders } from "../actions/index";
import { connect } from "react-redux";
import { Card, Button, Spinner, CardDeck } from "react-bootstrap";
import moment from "moment";

class OrderList extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

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
            <div className="mb-3 p-3 w-50 d-inline-block">
              <Card key="order.id ">
                <Card.Header className="text-muted">{`Order id : ${order.id}`}</Card.Header>
                <Card.Body>
                  <Card.Title>{order.item}</Card.Title>
                  <Card.Text>
                    <div>{`Time : ${order.quantity} month`}</div>
                    <div>{`Status : ${order.status}`}</div>
                  </Card.Text>
                  <Button variant="primary">Return</Button>
                </Card.Body>
                <Card.Footer className="">
                  Ordered{" "}
                  {moment(order.created_at, "YYYY-MM-DD HH:mm:ss").fromNow()}
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

export default connect(
  stateToProps,
  { fetchOrders }
)(OrderList);
