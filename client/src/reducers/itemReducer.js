export default function(state = null, action) {
  let newState, index;
  switch (action.type) {
    case "fetch_items":
      return action.payload || false;

    case "toggle_cart":
      newState = [...state];
      index = newState.findIndex(item => item.id === action.payload.id);
      if (newState[index].status === "available")
        newState[index].status = "inCart";
      else newState[index].status = "available";
      return newState;

    default:
      return state;
  }
}
