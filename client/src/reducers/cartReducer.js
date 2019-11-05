export default function(state = [], action) {
  let newState;
  switch (action.type) {
    case "add_to_cart":
      newState = [...state, action.payload];
      console.log("add_to_cart", newState);
      return newState;

    case "remove_from_cart":
      newState = state.filter(item => {
        if (action.payload.id === item.id) return false;
        return true;
      });
      console.log("remove_from_cart", newState);
      return newState;

    default:
      return state;
  }
}
