import React from "react";
import { connect } from "react-redux";
import { fetchItems } from "../actions";
import { Spinner } from "react-bootstrap";
import ItemCard from "./ItemCard";

class ItemList extends React.Component {
  //   state = { items: [] };

  renderContent() {
    if (this.props.items === null) {
      this.props.fetchItems();

      return (
        <div className="text-center mt-5">
          <Spinner animation="border" size="lg" />
        </div>
      );
    }
    return <div className="card-columns">{this.renderCards()}</div>;
  }

  renderCards() {
    return this.props.items
      .filter(item => {
        if (item.status === "available" || item.status === "inCart")
          return true;
        return false;
      })
      .map(item => {
        return <ItemCard item={item} key={item.id} />;
      });
  }

  render() {
    return this.renderContent();
  }
}

const stateToProps = state => {
  return { items: state.items };
};

export default connect(stateToProps, { fetchItems })(ItemList);
