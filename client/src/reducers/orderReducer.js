export default function(state = null, action) {
  switch (action.type) {
    case "fetch_orders":
      return [...action.payload];

    default:
      return state;
  }
}
