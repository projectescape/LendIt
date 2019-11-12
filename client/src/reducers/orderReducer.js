export default function(state = null, action) {
  switch (action.type) {
    case "fetch_orders":
      return [...action.payload];

    case "return_item":
      console.log("inside return_item reducer");
      return [...action.payload];

    default:
      return state;
  }
}
