import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions.js';

const AdminListUsers = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userDelete = useSelector(state => state.userDelete)
  // const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo) {
      console.log('asdasdas');
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  console.log(userList);
  //   const deleteHandler = (id) => {
  //     if (window.confirm('Are you sure?')) dispatch(deleteUser(id));
  //   };

  return (
    <>
      <h3>Users</h3>
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
              <th>EMAIL</th>
              <th style={{ textAlign: 'center' }}>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td class='align-middle'>{user.userId}</td>
                <td class='align-middle'>{user.phone}</td>
                <td class='align-middle'>{user.roles}</td>
                <td class='align-middle' style={{ textAlign: 'center' }}>
                  {/* {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )} */}
                </td>
                <td class='align-middle'>
                  <LinkContainer
                    to={`/admin/users/${user.userId}/edit`}
                    className='text-decoration-none'>
                    <Button className='btn-sm' variant='light'>
                      <i className='fas fa-edit'>xxxx</i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm'
                    variant='danger'

                    // onClick={() => deleteHandler(user._id)}
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

export default AdminListUsers;
