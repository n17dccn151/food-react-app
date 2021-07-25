import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getMyListOrder } from '../actions/orderActions.js';
import NumberFormat from 'react-number-format';
import { getFullDate } from '../helper/getFullDate.js';

import {
  Image,
  Table,
  Tag,
  Layout,
  Menu,
  Breadcrumb,
  Pagination,
  Row,
  Col,
  Timeline,
} from 'antd';
import 'antd/dist/antd.css';

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

  const expandedRow = (row) => {
    console.log(row.orderFoods);
    const columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        width: '10%',
        render: (image) => (
          <Image width={150} alt={image} src={image} preview={{}} />
        ),
      },
      { title: 'Name', dataIndex: 'name', key: 'nameFood', width: '40%' },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amountFood',
        width: '10%',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'priceFood',
        width: '30%',
        render: (priceFood) => (
          <NumberFormat
            value={priceFood}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$ '}
          />
        ),
      },
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
    {
      title: 'ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: '8%',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: ['userDetailDto', 'phone'],
      key: 'phone',
      width: '10%',
      // render: (text) => <a>{text}</a>,
    },

    {
      title: 'Name',
      dataIndex: ['userDetailDto', 'firstName'],
      key: 'name',
      width: '15%',
      // render: (text) => <a>{text}</a>,
    },

    {
      title: 'Address',
      dataIndex: ['userDetailDto', 'address'],
      key: 'address',
      width: '20%',
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
      title: 'Date',
      dataIndex: '',
      key: 'createdDate',
      render: (_, record) =>
        orders.length >= 1 ? (
          <div>
            <Timeline>
              <Timeline.Item>{getFullDate(record.createdDate)}</Timeline.Item>
              <Timeline.Item>{getFullDate(record.updatedDate)}</Timeline.Item>
            </Timeline>
          </div>
        ) : null,
      // render: (createdDate) => getFullDate(createdDate),
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
            <Breadcrumb.Item>My Order</Breadcrumb.Item>
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
            scroll={{ x: '', y: 400 }}
          />
        </Content>
      </Layout>
    )
  );
};

export default AntOrderInfo;
