import {
  CART_REQUEST,
  CART_SUCCESS,
  CART_FAIL,
  CART_RESET,
  CART_ADD_ITEM,
} from '../constants/cartConstants.js';

import axios from 'axios';

export const userCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3002');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    const { data } = await axios.get(
      'http://localhost:8080/api/customers/cart',
      config
    );
    //console.log(data);

    dispatch({
      type: CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const cartFood = {
    id: Number(id),
    amount: qty,
  };

  const {
    userLogin: { userInfo },
  } = getState();

  console.log(cartFood);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };
  const { data } = await axios.post(
    `http://localhost:8080/api/customers/cart`,
    cartFood,
    config
  );

  dispatch({
    type: CART_ADD_ITEM,
    payload: data,
  });
};
