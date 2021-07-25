import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions.js';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Input } from 'antd';
const { Search } = Input;
const SearchCustom = ({ history }) => {
  const onSearch = (value) => {
    if (value.trim()) {
      history.push(`/search/${value}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Search
      style={{ margin: '16px' }}
      placeholder='input search text'
      onSearch={onSearch}
      enterButton
    />
  );
};

export default SearchCustom;
