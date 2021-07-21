import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions.js';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const AdminListProducts = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // const productDelete = useSelector(state => state.productDelete)
  // const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

  // const productCreate = useSelector(state => state.productCreate)
  // const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // useEffect(() => {
  //     dispatch({ type: PRODUCT_CREATE_RESET })

  //     if (userInfo && userInfo.isAdmin) {
  //         if (successCreate) {
  //             history.push(`/admin/product/${createdProduct._id}/edit`)
  //         } else {
  //             dispatch(listProducts())
  //         }
  //     }
  //     else {
  //         history.push('/login')

  //     }

  // }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

  // const deleteHandler = (id) => {
  //     if (window.confirm('Are you sure?'))
  //         dispatch(deleteProduct(id))
  // }

  // const createProductHandler = () => {
  //     dispatch(createProduct())
  // }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h3>Products</h3>
          <Button
            size='sm'
            variant='outline-primary'

            // onClick={createProductHandler}
          >
            <i className='fas fa-plus'> Create product</i>
          </Button>
        </Col>
      </Row>
      {/* {loadingDelete && <h5><Loader /></h5>}
            {errorDelete && <h5><Message variant="danger">{errorDelete}</Message></h5>}
            {loadingCreate && <h5><Loader /></h5>}
            {errorCreate && <h5><Message variant="danger">{errorCreate}</Message></h5>} */}
      {loading ? (
        <h5>
          <Loader />
        </h5>
      ) : error ? (
        <h5>
          <Message variant='danger'>{error}</Message>
        </h5>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>COUNT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.foodId}>
                <td class='align-middle'>{product.foodId}</td>
                <td class='align-middle'>{product.name}</td>
                <td class='align-middle'>${product.price}</td>
                <td class='align-middle'>{product.category}</td>
                <td class='align-middle'>{product.brand}</td>
                <td class='align-middle'>{product.quantity}</td>
                <td class='align-middle'>
                  <LinkContainer
                    to={`/admin/products/${product.foodId}/edit`}
                    className='text-decoration-none'>
                    <Button className='btn-sm' variant='light'>
                      <i className='fas fa-edit'> aaaaaaaaaaaa</i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm'
                    variant='danger'
                    //   onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminListProducts;
