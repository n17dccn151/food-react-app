import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { listUsers } from '../actions/userActions.js';
import AntLoader from '../components/AntLoading.js';
import AntError from '../components/AntError.js';

import {
  Image,
  Table,
  Tag,
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Popconfirm,
  Pagination,
  message,
  Row,
  Col,
  Divider,
  Avatar,
} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
const { Content } = Layout;
const { SubMenu } = Menu;

const AntAdminListUser = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  console.log('', loading);

  const [current, setCurrent] = useState(1);

  //   const key = 'updatable';
  //   if (loading === true) {
  //     message.loading({ content: 'Loading...', key });
  //   } else {
  //     message.success({ content: 'Loaded!', key, duration: 2 });
  //   }

  const columns = [
    {
      title: 'Image',
      dataIndex: '',
      render: (_, record) => (
        <Avatar
          style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
          size='large'>
          {record.email}
        </Avatar>
        // <Image width={150} alt={image} src={image} preview={{}} />
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles) => (
        <>
          {roles.map((item) => {
            let color = item.length > 5 ? 'geekblue' : 'green';
            if (item === 'ROLE_USER') {
              color = '#87d068';
            }
            console.log('________', item, color);
            return (
              <Tag color={color} key={item}>
                {item.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) =>
        users.length >= 1 ? (
          <Popconfirm
            title='Sure to delete?'

            // onConfirm={() => this.handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const pageSize = 4;
  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return users.slice((current - 1) * pageSize, current * pageSize);
  };
  // Custom pagination component
  const MyPagination = ({ total, onChange, current }) => {
    return (
      <Pagination
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
      />
    );
  };

  return loading ? (
    <AntLoader />
  ) : error ? (
    <AntError />
  ) : (
    <Layout className='site-layout'>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          <Col span={12}>
            <MyPagination
              total={users.length}
              current={current}
              onChange={setCurrent}
            />
          </Col>

          <Col span={12}>
            <Divider orientation='right'>
              <Link to='/admin/userss/add'>
                <Button type='primary'>Add User</Button>
              </Link>
            </Divider>
          </Col>
        </Row>

        <Table
          columns={columns}
          rowKey='userId'
          dataSource={getData(current, pageSize)}
          pagination={false}
        />
      </Content>
    </Layout>
  );
};

export default AntAdminListUser;
