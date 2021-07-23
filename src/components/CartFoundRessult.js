import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { logout } from '../actions/userActions.js';
import { SmileOutlined } from '@ant-design/icons';
const CartFoundRessult = ({ match, location, history, test }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  const goHome = () => {
    history.push('/');
  };

  return (
    <div style={{ margin: '100px auto' }}>
      <Result
        icon={<SmileOutlined />}
        title='Opps, Cart Found!'
        extra={
          <Button type='primary' onClick={goHome}>
            Home
          </Button>
        }
      />
    </div>
  );
};

export default CartFoundRessult;
