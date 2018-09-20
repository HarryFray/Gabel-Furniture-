import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_QTY,
  UPDATE_SPECIAL_REQ,
  UPDATE_COLOR
} from '../actions/items';

export default function words(state = [], action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return state.concat([action.itemData]);
    case REMOVE_ITEM_FROM_CART:
      return state.filter(item => item.id !== action.id);
    case UPDATE_QTY:
      return state.map(item => {
        return item.id === action.id ? { ...item, qty: action.qty } : item;
      });
    case UPDATE_SPECIAL_REQ:
      return state.map(item => {
        return item.id === action.id
          ? { ...item, specialReq: action.specialReq }
          : item;
      });
    case UPDATE_COLOR:
      return state.map(item => {
        return item.id === action.id ? { ...item, color: action.color } : item;
      });
    default:
      return state;
  }
}
