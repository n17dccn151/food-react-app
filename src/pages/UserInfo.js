import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntLoader from '../components/AntLoading.js';
import { getUserDetailList } from '../actions/userActions.js';
import NumberFormat from 'react-number-format';
import { updateUserDetail } from '../actions/userActions';
import { USER_DETAIL_UPDATE_RESET } from '../constants/userConstants';

import {
  Row,
  Col,
  Image,
  Space,
  Typography,
  Button,
  Input,
  Affix,
  Collapse,
  Radio,
  Tag,
  message,
  Descriptions,
  Layout,
  Modal,
  Divider,
  Form,
  InputNumber,
} from 'antd';

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

///////////////
const UserInfo = ({ match, location, history }) => {
  const [value, setValue] = useState();
  const [checkedAddress, setCheckedAddress] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { loadingUser, error, userInfo } = userLogin;
  const [visible, setVisible] = useState(false);

  const [edited, setEdited] = useState({});

  const userDetailUpdate = useSelector((state) => state.userDetailUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    userDetail: ressult,
  } = userDetailUpdate;

  useEffect(() => {
    if (successUpdate === true) {
      message.success('Edit user detail id: ' + ressult.id);

      dispatch({ type: USER_DETAIL_UPDATE_RESET });
    } else if (successUpdate === false) {
      message.warning('This is a warning message: ' + errorUpdate);
    }
    dispatch(getUserDetailList());
  }, [successUpdate]);

  const onCreate = (values) => {
    values.userDetail.id = edited.id;
    values.userDetail.status = edited.status;
    console.log('Received values of form: ', values);
    console.log('Received values of form: ', values.userDetail);
    dispatch(updateUserDetail(values.userDetail.id, values.userDetail));
    setVisible(false);
  };

  const handClicked = (item) => {
    console.log(' checked', item);
    setEdited(item);
    setVisible(true);
  };

  const dispatch = useDispatch();
  const listUserDetail = useSelector((state) => state.userDetailList);
  const { loading, error: errorDetail, details } = listUserDetail;

  console.log(details);
  useEffect(() => {
    dispatch(getUserDetailList());
  }, [dispatch]);

  ////////////////

  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title='Edit user detail'
        okText='Edit'
        cancelText='Cancel'
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}>
        <Form
          form={form}
          layout='vertical'
          name='form_in_modal'
          fields={[
            {
              name: ['userDetail', 'firstName'],
              value: edited.firstName,
            },
            {
              name: ['userDetail', 'lastName'],
              value: edited.lastName,
            },
            {
              name: ['userDetail', 'phone'],
              value: edited.phone,
            },
            {
              name: ['userDetail', 'address'],
              value: edited.address,
            },
          ]}>
          <Form.Item
            name={['userDetail', 'firstName']}
            label='First Name'
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['userDetail', 'lastName']}
            label='Last Name'
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={['userDetail', 'phone']}
            label='Phone'
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item name={['userDetail', 'address']} label='Address'>
            <Input type='textarea' />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    !loading && (
      <Layout style={({ margin: '0 auto' }, { padding: '55px' })}>
        <Descriptions
          title='User Info'
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label='Phone'>{userInfo.phone}</Descriptions.Item>
          <Descriptions.Item label='Email'>{userInfo.email}</Descriptions.Item>
          <Descriptions.Item label='Roles'>
            {userInfo.roles.map((item) => (
              <>{item}</>
            ))}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <Descriptions title='User Info Detail' layout='vertical'></Descriptions>

        {details.map((item) => (
          <Descriptions
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            <>
              <Descriptions.Item label='First name' span={3}>
                {item.firstName}
              </Descriptions.Item>
              <Descriptions.Item label='Last name' span={3}>
                {item.lastName}
              </Descriptions.Item>
              <Descriptions.Item label='Phone' span={3}>
                {item.phone}
              </Descriptions.Item>

              <Descriptions.Item label='Address' span={3}>
                {item.address}
              </Descriptions.Item>
              <Descriptions.Item label='' span={3}>
                <Button
                  type='link'
                  onClick={() => {
                    handClicked(item);
                  }}>
                  Edit
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label='' span={3}></Descriptions.Item>
            </>
          </Descriptions>
        ))}

        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </Layout>
    )
  );
};

export default UserInfo;
