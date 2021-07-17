import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getListOrder } from '../actions/orderActions.js';

const AdminListOrders = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(getListOrder());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  console.log(orders);
  return (
    <>
      <h3>Orders</h3>
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
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th style={{ textAlign: 'center' }}>PAID</th>
              <th style={{ textAlign: 'center' }}>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td class='align-middle'>{order.orderId}</td>
                <td class='align-middle'>{order.userId}</td>
                <td class='align-middle'>
                  {order.createdDate.substring(0, 10)}
                </td>
                <td class='align-middle'>${order.totalPrice}</td>
                <td class='align-middle' style={{ textAlign: 'center' }}>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td class='align-middle' style={{ textAlign: 'center' }}>
                  {order.isDelivered ? (
                    order.isDeliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td class='align-middle'>
                  <LinkContainer
                    to={`/orders/${order._id}`}
                    className='text-decoration-none'>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminListOrders;
