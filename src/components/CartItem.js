import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { userCart } from '../actions/cartActions.js';

import { Link } from 'react-router-dom';

import { Menu, Badge } from 'antd';

import { ShoppingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartDetail = useSelector((state) => state.cart);
  const { loading, error, cart } = cartDetail;

  useEffect(() => {
    dispatch(userCart());
  }, [dispatch]);

  console.log('xxxxx', cart);
  return (
    loading === false && (
      <Menu.Item key='cart' icon={<ShoppingOutlined />}>
        <Link to='/cart' />
        <Badge count={cart.cartFoods.length} size='small'></Badge>
      </Menu.Item>
    )
  );
};

export default CartItem;
