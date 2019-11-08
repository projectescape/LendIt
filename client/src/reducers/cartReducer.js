export default function(state = [], action) {
  let newState, index;
  switch (action.type) {
    case "add_to_cart":
      newState = [...state, action.payload];
      return newState;

    case "remove_from_cart":
      newState = state.filter(item => {
        if (action.payload.id === item.id) return false;
        return true;
      });
      return newState;

    case "edit_quantity_cart":
      index = state.findIndex(item => item.id === action.payload.id);
      newState = state.slice();
      newState[index].quantity =
        newState[index].quantity + action.payload.value;
      if (newState[index].quantity === 0) newState[index].quantity = 1;
      return newState;

    case "empty_cart":
      return [];

    default:
      return state;
  }
}
