import React from "react";
import { connect } from "react-redux";
import { fetchItems } from "../actions";

import ItemCard from "./ItemCard";

class ItemList extends React.Component {
  //   state = { items: [] };

  renderCards() {
    if (this.props.items === null) {
      this.props.fetchItems();
      return null;
    }
    console.log(this.props.items);
    // console.log(typeof this.props.items.updated_at);
    return this.props.items.map(item => {
      return <ItemCard item={item} key={item.id} />;
    });
  }

  render() {
    return <div className="card-columns">{this.renderCards()}</div>;
  }
}

const stateToProps = state => {
  return { items: state.items };
};

export default connect(
  stateToProps,
  { fetchItems }
)(ItemList);
