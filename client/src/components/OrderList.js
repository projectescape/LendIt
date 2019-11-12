import React from "react";
import { connect } from "react-redux";
import OrderCard from "./OrderCard";
import { Spinner } from "react-bootstrap";
import { fetchOrders } from "../actions";

class OrderList extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderContent = () => {
    if (this.props.orders === null) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" size="lg" />
        </div>
      );
    }
    return this.props.orders.map(order => {
      return (
        <div key={order.id} className="mb-3 p-3 w-50 d-inline-block">
          <OrderCard order={order} />
        </div>
      );
    });
  };

  render = () => {
    return this.renderContent();
  };
}

const stateToProps = state => ({
  orders: state.orders
});

export default connect(stateToProps, { fetchOrders })(OrderList);
