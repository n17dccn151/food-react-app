import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { logout } from '../actions/userActions.js';
const NotFound = ({ match, location, history }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  const checkLogout = () => {
    history.push('/');
  };

  return (
    <>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={checkLogout}>
            Go Home
          </Button>
        }
      />
    </>
  );
};

export default NotFound;
