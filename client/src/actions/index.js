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
  console.log("toggle_cart action", item.id);
  return {
    type: "toggle_cart",
    payload: {
      id: item.id
    }
  };
};
