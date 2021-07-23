import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { logout } from '../actions/userActions.js';
const Logout = ({ match, location, history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    history.push('/');
  }, [dispatch]);

  return <div></div>;
};

export default Logout;
