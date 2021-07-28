import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { createUser } from '../actions/userActions';
import { updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { getUserDetails } from '../actions/userActions';

import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
  message,
  Progress,
  Modal,
  Checkbox,
  Row,
  Col,
  Radio,
} from 'antd';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Option } = Select;

const AntAdminUserEdit = ({ history, match }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user: userDetail } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdateUser,
    success: successUpdateUser,
    error: errorUpdateUser,
    user: ressultUser,
  } = userUpdate;
  const { userInfo } = user;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values) => {
    if (
      values.user.phone === userDetail.phone &&
      values.user.email === userDetail.email &&
      values.user.role.length === userDetail.roles.length
    ) {
      message.warning('You not change');
    } else {
      console.log('1', userId);

      dispatch(updateUser(userId, values.user));
    }
  };
  console.log(userDetail);
  useEffect(() => {
    if (!userDetail.phone) {
      console.log('2' + userId);
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, userId, user]);

  useEffect(() => {
    if (successUpdateUser === true) {
      message.success('Edit user phone: ' + ressultUser.phone);

      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/users');
    } else if (successUpdateUser === false) {
      message.warning('This is a warning message: ' + errorUpdateUser);
    }
  }, [successUpdateUser]);

  // useEffect(() => {
  //   if (successCreateUser === true) {
  //     message.success('Added user name: ' + ressultUser.phone);
  //     dispatch({ type: USER_REGISTER_RESET });
  //   } else if (successCreateUser === false) {
  //     message.warning('This is a warning message: ' + errorCreateUser);
  //   }
  // }, [successCreateUser]);

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Edit</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
        wrapperCol={{ sm: 24 }}
        style={{ width: '80%', marginRight: 0 }}
        fields={[
          {
            name: ['user', 'phone'],
            value: userDetail.phone,
          },
          {
            name: ['user', 'email'],
            value: userDetail.email,
          },
          {
            name: ['user', 'role'],
            value: userDetail.roles,
          },
        ]}>
        <Form.Item
          name={['user', 'phone']}
          label='Phone'
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name={['user', 'email']}
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name={['user', 'role']}
          label='Roles'
          rules={[
            {
              required: true,
              message: 'Please input your Roles!',
            },
          ]}>
          <Checkbox.Group>
            <Row>
              <Col span={12}>
                <Checkbox
                  value='ROLE_USER'
                  style={{
                    lineHeight: '32px',
                  }}>
                  User
                </Checkbox>
              </Col>

              <Col span={12}>
                <Checkbox
                  value='ROLE_ADMIN'
                  style={{
                    lineHeight: '32px',
                  }}>
                  Admin
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 12,
          }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default AntAdminUserEdit;
