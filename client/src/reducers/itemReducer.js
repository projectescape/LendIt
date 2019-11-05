export default function(state = null, action) {
  let newState, index;
  switch (action.type) {
    case "fetch_items":
      return action.payload || false;
    case "toggle_cart":
      console.log("toggle_cart reducer");
      newState = state.slice();
      index = newState.findIndex(item => item.id === action.payload.id);
      if (newState[index].status === "available")
        newState[index].status = "inCart";
      else newState[index].status = "available";
      console.log("state", state[index]);
      console.log("newState", newState[index]);
      return newState;
    default:
      return state;
  }
}
