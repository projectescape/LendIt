import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemReducer from "./itemReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  auth: authReducer,
  items: itemReducer,
  cart: cartReducer,
  orders: orderReducer
});
