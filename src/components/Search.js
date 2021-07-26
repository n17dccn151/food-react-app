import React from 'react';

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
