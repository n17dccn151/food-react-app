import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { listCategories, deleteCategory } from '../actions/categoryActions.js';
import { CATEGORY_DELETE_RESET } from '../constants/categoryConstants';
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

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const AntAdminListCategory = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingListCategory,
    error: errorCategories,
    categories,
  } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = categoryDelete;

  // const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: CATEGORY_DELETE_RESET });
    if (successDelete === true) {
      message.success('Deleted category');

      dispatch(listCategories());
    } else if (successDelete === false) {
      message.warning('This is a warning message: ' + errorDelete);
    }

    dispatch(listCategories());
    message.success({ content: 'Loaded!', key, duration: 2 });
  }, [dispatch, successDelete]);

  const handleDelete = (id) => {
    console.log('oke delet' + id);
    dispatch(deleteCategory(id));
    // setPreviewVisible(false);
  };

  console.log(categories);

  const [current, setCurrent] = useState(1);

  const key = 'updatable';

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
            onConfirm={() => handleDelete(record.categoryId)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) =>
        categories.length >= 1 ? (
          <Link to={`/admin/category/${record.categoryId}/edit`}>Edit</Link>
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
                <Link to='/admin/category/add'>
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
