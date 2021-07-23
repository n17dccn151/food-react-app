import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getMyListOrder } from '../actions/orderActions.js';
import NumberFormat from 'react-number-format';
import { getFullDate } from '../helper/getFullDate.js';

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

const AntOrderInfo = () => {
  const dispatch = useDispatch();
  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading, error, orders } = orderMyList;
  const [id, setId] = useState();
  useEffect(() => {
    dispatch(getMyListOrder());
  }, [dispatch]);

  console.log(orders);

  const [current, setCurrent] = useState(1);

  const key = 'updatable';

  //   if (loading === true) {
  //     message.loading({ content: 'Loading...', key });
  //   }
  //   if (loading === false) {
  //     message.success({ content: 'Loaded!', key, duration: 2 });
  //   }

  // const getFullDate = (date) => {
  //   const dateAndTime = date.split('T');

  //   return dateAndTime[0].split('-').reverse().join('-');
  // };

  const expandedRow = (row) => {
    console.log(row.orderFoods);
    const columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        render: (image) => (
          <Image width={150} alt={image} src={image} preview={{}} />
        ),
      },
      { title: 'Name', dataIndex: 'name', key: 'nameFood' },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amountFood',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'priceFood',
        render: (priceFood) => (
          <NumberFormat
            value={priceFood}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
          />
        ),
      },
      //   {
      //     title: 'Action',
      //     dataIndex: 'operation',
      //     key: 'operation',
      //     render: () => (
      //       <Space size='middle'>
      //         <a>Pause</a>
      //         <a>Stop</a>
      //         <Dropdown overlay={menu}>
      //           <a>
      //             More <DownOutlined />
      //           </a>
      //         </Dropdown>
      //       </Space>
      //     ),
      //   },
    ];

    return (
      <Table
        columns={columns}
        dataSource={row.orderFoods}
        rowKey='id'
        pagination={false}
      />
    );
  };

  const columns = [
    //   {
    //     title: 'Image',
    //     dataIndex: 'image',
    //     render: (image) => (
    //       <Image width={150} alt={image} src={image} preview={{}} />
    //     ),
    //   },
    {
      title: 'ID',
      dataIndex: 'orderId',
      key: 'orderId',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: ['userDetailDto', 'phone'],
      key: 'phone',
      // render: (text) => <a>{text}</a>,
    },

    {
      title: 'Name',
      dataIndex: ['userDetailDto', 'firstName'],
      key: 'name',
      // render: (text) => <a>{text}</a>,
    },

    {
      title: 'Address',
      dataIndex: ['userDetailDto', 'address'],
      key: 'address',
      // render: (text) => <a>{text}</a>,
    },

    {
      title: 'Total',
      dataIndex: '',
      key: 'total',
      render: (_, record) =>
        orders.length >= 1 ? (
          <div>
            <NumberFormat
              value={record.orderFoods.reduce(
                (acc, item) => acc + item.amount * item.price,
                0
              )}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
            />
          </div>
        ) : //   <Popconfirm
        //     title='Sure to delete?'

        //     // onConfirm={() => this.handleDelete(record.key)}
        //   >
        //     <a>Delete</a>
        //   </Popconfirm>
        null,
    },
    {
      title: 'CreatedDate',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (createdDate) => getFullDate(createdDate),
    },
    {
      title: 'UpdatedDate',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (updatedDate) => getFullDate(updatedDate),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status.length > 5 ? 'geekblue' : 'green';
        if (status === 'CANCELLED') {
          color = 'volcano';
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const pageSize = 4;
  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return orders.slice((current - 1) * pageSize, current * pageSize);
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
                total={orders.length}
                current={current}
                onChange={setCurrent}
              />
            </Col>

            <Col span={12}></Col>
          </Row>

          <Table
            columns={columns}
            rowKey='orderId'
            // expandable={{
            //   expandedRowRender: (record) => (
            //     <p style={{ margin: 0 }}>{record.description}</p>
            //   ),
            //   rowExpandable: (record) => record.description !== '',
            // }}
            dataSource={getData(current, pageSize)}
            pagination={false}
            expandedRowRender={expandedRow}
            scroll={{ x: '', y: 240 }}
          />
        </Content>
      </Layout>
    )
  );
};

export default AntOrderInfo;
