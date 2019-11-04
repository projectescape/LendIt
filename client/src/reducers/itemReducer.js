export default function(state = null, action) {
  switch (action.type) {
    case "fetch_items":
      return action.payload || false;
    default:
      return state;
  }
}
