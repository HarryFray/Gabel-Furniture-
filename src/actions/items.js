export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const UPDATE_QTY = 'UPDATE_QTY';
export const UPDATE_SPECIAL_REQ = 'UPDATE_SPECIAL_REQ';

export function addItemToCart(itemData) {
  return {
    type: ADD_ITEM_TO_CART,
    itemData
  };
}

export function removeItemFromCart(id) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    id
  };
}

export function updateSpecialReq(id, specialReq) {
  return {
    type: UPDATE_SPECIAL_REQ,
    id,
    specialReq
  };
}

export function updateQty(id, qty) {
  return {
    type: UPDATE_QTY,
    id,
    qty
  };
}
