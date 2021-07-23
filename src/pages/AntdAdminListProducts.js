import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions.js';
import NumberFormat from 'react-number-format';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import {
  Image,
  Table,
  Tag,
  Button,
  Space,
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
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AntdAdminListProducts = ({ history, match }) => {
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

  const [current, setCurrent] = useState(1);

  console.log(products);

  // if (loading) {
  //   message.loading({ content: 'Loading...', key });
  // } else {
  //   message.success({ content: 'Loaded!', key, duration: 2 });
  // }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      render: (images) => (
        <Image
          width={150}
          alt={{ ...images[0] }.url}
          src={{ ...images[0] }.url}
          preview={{}}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <div>
          <NumberFormat
            value={record.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
          />
        </div>
      ),

      // className: 'column-money',
      // dataIndex: 'money',
      // align: 'right',
    },

    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      // className: 'column-money',
      // dataIndex: 'money',
      // align: 'right',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status.length > 5 ? 'geekblue' : 'green';
        if (status === 'UNAVAILABLE') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) =>
        products.length >= 1 ? (
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
    return products.slice((current - 1) * pageSize, current * pageSize);
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
    !loading && (
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <Row>
            <Col span={12}>
              <MyPagination
                total={products.length}
                current={current}
                onChange={setCurrent}
              />
            </Col>

            <Col span={12}>
              <Divider orientation='right'>
                <Link to='/admin/products/add'>
                  <Button type='primary'>Add Product</Button>
                </Link>
              </Divider>
            </Col>
          </Row>

          <Table
            columns={columns}
            rowKey='foodId'
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

export default AntdAdminListProducts;
