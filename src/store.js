import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  productListReducer,
  productDetailsReducer,
  productUpdateReducer,
} from './reducers/productReducers.js';

import { cartReducer } from './reducers/cartReducers.js';
import {
  userLoginReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateReducer,
} from './reducers/userReducers.js';
import {
  orderMyListReducer,
  orderDetailsReducer,
  orderListReducer,
} from './reducers/orderReducers.js';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,

  cart: cartReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,

  orderMyList: orderMyListReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  productList: {
    loading: true,
  },

  // productDetails: {
  //   loading: true,
  // },

  cart: {
    loading: true,
  },
  userLogin: {
    loading: false,
  },

  userLogin: { userInfo: userInfoFromStorage },

  orderMyList: {
    loading: true,
  },

  orderDetails: {
    loading: true,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
