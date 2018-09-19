export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

export function addItemToCart(id) {
  return {
    type: ADD_ITEM_TO_CART,
    id
  };
}

export function removeItemFromCart(id) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    id
  };
}
