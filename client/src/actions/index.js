import axios from "axios";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: "fetch_user", payload: res.data });
};

export const fetchItems = () => async dispatch => {
  const res = await axios.get("/api/items");
  dispatch({ type: "fetch_items", payload: res.data });
};
