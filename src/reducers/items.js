import { ADD_ITEM_TO_CART } from '../actions/items';
import { REMOVE_ITEM_FROM_CART } from '../actions/items';

export default function words(state = [], action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return state.concat([action.id]);
    case REMOVE_ITEM_FROM_CART:
      return state.filter(item => item !== action.id);
    default:
      return state;
  }
}
