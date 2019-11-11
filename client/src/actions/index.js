import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: "fetch_user", payload: res.data });
};

export const fetchItems = () => async dispatch => {
  const res = await axios.get("/api/items");
  dispatch({ type: "fetch_items", payload: res.data });
};

export const addToCart = item => {
  return {
    type: "add_to_cart",
    payload: {
      ...item,
      quantity: 1
    }
  };
};

export const removeFromCart = item => {
  return {
    type: "remove_from_cart",
    payload: {
      id: item.id
    }
  };
};

export const toggleCart = item => {
  return {
    type: "toggle_cart",
    payload: {
      id: item.id
    }
  };
};

export const editQuantityCart = item => {
  return {
    type: "edit_quantity_cart",
    payload: {
      id: item.id,
      value: item.value
    }
  };
};

export const placeOrder = () => async (dispatch, getState) => {
  let { items, cart } = getState();
  await axios.post("/api/placeOrder", cart);
  await dispatch({ type: "empty_cart", payload: {} });
  console.log("items", items);
  console.log("cart", cart);
  for (var j = 0; j < cart.length; j++) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === cart[j].id) {
        items.splice(i, 1);
        break;
      }
    }
  }
  dispatch({ type: "fetch_items", payload: items });
};

export const fetchOrders = () => async dispatch => {
  const { data } = await axios.get("/api/orders");
  console.log(data);
  dispatch({ type: "fetch_orders", payload: data });
};
