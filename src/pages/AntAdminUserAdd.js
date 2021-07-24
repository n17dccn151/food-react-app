import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createProduct } from '../actions/productActions.js';
import NumberFormat from 'react-number-format';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { IMAGE_ADD_IMAGE_RESET } from '../constants/imageConstants';
import { createImage } from '../actions/imageAction.js';
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

const AntAdminUserAdd = ({ history, match }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const imageCreate = useSelector((state) => state.imageCreate);
  const {
    loading: loadingCreateImage,
    success: successCreateImage,
    error: errorCreateImage,
    images,
  } = imageCreate;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreateProduct,
    success: successCreateProduct,
    error: errorCreateProduct,
    product: ressultProduct,
  } = productCreate;
  const [product, setProduct] = useState({});
  const [imageRessult, setImageRessult] = useState({});

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
    console.log(values);
  };
  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
        wrapperCol={{ sm: 24 }}
        style={{ width: '80%', marginRight: 0 }}
        initialValues={{
          'checkbox-group': ['USER', 'ADMIN'],
        }}>
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
          name={['user', 'password']}
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name={['user', 'roles']}
          label='Roles'
          rules={[
            {
              required: true,
              message: 'Please input your Roles!',
            },
          ]}>
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  value='USER'
                  style={{
                    lineHeight: '32px',
                  }}>
                  User
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value='B'
                  style={{
                    lineHeight: '32px',
                  }}
                  disabled>
                  B
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value='ADMIN'
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

export default AntAdminUserAdd;
