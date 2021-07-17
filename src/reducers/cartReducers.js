import {
  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,
  CART_ADD_ITEM,
  CART_RESET,
} from '../constants/cartConstants.js';

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return { loading: false, cart: action.payload };

    case CART_REQUEST:
      return { loading: true, ...state };
    case CART_SUCCESS:
      console.log('asdasd');
      return { loading: false, cart: action.payload };
    case CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
