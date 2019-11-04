export default function(state = null, action) {
  switch (action.type) {
    case "fetch_items":
      console.log("inside fetch item reducer");

      return action.payload || false;
    default:
      return state;
  }
}
