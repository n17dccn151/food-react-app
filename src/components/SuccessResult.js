import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { logout } from '../actions/userActions.js';
const SuccessResult = ({ match, location, history, test }) => {
  const dispatch = useDispatch();

  console.log(test);
  return (
    <div style={{ margin: '100px auto' }}>
      <Result
        status='success'
        title='Successfully Ordered!'
        subTitle={`Order number: ${test} `}
        extra={[
          <Link to='/myorder'>
            <Button type='primary' key='console'>
              Go Your Order
            </Button>
          </Link>,
          <Link to='/'>
            <Button key='buy'>Buy Continue</Button>
          </Link>,
        ]}
      />
    </div>
  );
};

export default SuccessResult;
