import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { getMyListOrder } from '../actions/orderActions.js';

const Order = ({ match }) => {
  const dispatch = useDispatch();

  const orderMyList = useSelector((state) => state.orderMyList);

  const { orders, loading, error } = orderMyList;

  useEffect(() => {
    dispatch(getMyListOrder());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  console.log(orders);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h3>Order </h3>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {orders.map((item) => (
              <ListGroup.Item key={item.orderId}>
                <Row>
                  <Col md={3} style={{ margin: 'auto' }}>
                    <Link
                      className='text-decoration-none'
                      to={`/orders/${item.orderId}`}>
                      {item.orderId}
                    </Link>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default Order;
