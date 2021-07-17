import React, { useEffect } from 'react';
import Food from './Product';
import Loading from './Loading';
import { useGlobalContext } from '../context';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js';

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  //const { foods, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  //console.log(JSON.parse(localStorage.getItem('userInfo')));

  // console.log('ádasdasd');
  // console.log(products);
  // console.log(loading);

  // if (products.length < 1) {
  //   return (
  //     <h2 className='section-title'>no foods mathched your search criteria</h2>
  //   );
  // }

  return (
    <section className='section'>
      <h2 className='section-title'>Foods</h2>
      <div className='cocktails-center'>
        {products.map((item) => {
          console.log(item);
          return <Food key={item.foodId} {...item} />;
        })}
      </div>
    </section>
  );
};

export default ProductList;
