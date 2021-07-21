import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { listCategories } from '../actions/categoryActions.js';

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
} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
const { Content } = Layout;
const { SubMenu } = Menu;

const AntAdminListCategory = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingListCategory,
    error: errorCategories,
    categories,
  } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  console.log(categories);

  const [current, setCurrent] = useState(1);

  const key = 'updatable';
  if (loadingListCategory === true) {
    message.loading({ content: 'Loading...', key });
  } else {
    message.success({ content: 'Loaded!', key, duration: 2 });
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => (
        <Image width={150} alt={image} src={image} preview={{}} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) =>
        categories.length >= 1 ? (
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
    return categories.slice((current - 1) * pageSize, current * pageSize);
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

  return (
    !loadingListCategory && (
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <Row>
            <Col span={12}>
              <MyPagination
                total={categories.length}
                current={current}
                onChange={setCurrent}
              />
            </Col>

            <Col span={12}>
              <Divider orientation='right'>
                <Link to='/admin/categoryy/add'>
                  <Button type='primary'>Add Category</Button>
                </Link>
              </Divider>
            </Col>
          </Row>

          <Table
            columns={columns}
            rowKey='categoryId'
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.description !== '',
            }}
            dataSource={getData(current, pageSize)}
            pagination={false}
          />
        </Content>
      </Layout>
    )
  );
};

export default AntAdminListCategory;
