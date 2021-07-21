import React from 'react';
import ProductList from '../components/ProductList';
import SearchForm from '../components/SearchForm';
import AntCarousel from '../components/AntCarousel';
import AntProductList from '../components/AntProductList';
const Home = () => {
  return (
    <main>
      {/* <SearchForm /> */}
      <AntCarousel />
      <AntProductList />
      {/* <ProductList /> */}
    </main>
  );
};

export default Home;
