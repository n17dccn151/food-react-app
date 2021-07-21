import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { logout } from '../actions/userActions.js';
const AntError = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <Result
        status='403'
        title='403'
        subTitle='Sorry, you are not authorized to access this page.'
        extra={
          <Link to='/login'>
            <Button type='primary'>Login agian</Button>
          </Link>
        }
      />
    </>
  );
};

export default AntError;
