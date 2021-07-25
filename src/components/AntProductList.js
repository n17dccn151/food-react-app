import React, { useEffect, useState } from 'react';
import AntProduct from './AntProduct';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js';
import { withRouter } from 'react-router';
import { Layout, Row, Divider, Space, Col, Pagination, Text } from 'antd';
import AntLoader from '../components/AntLoading';
const AntProductList = ({ history, match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const { Header, Content, Footer, Sider } = Layout;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!loading) {
      console.log('aaaaaaaaaaa', products.data.totalItems);
    }
    dispatch(listProducts(keyword, pageSize, current - 1));
  }, [dispatch, keyword, pageSize, current]);

  //const { foods, loading } = useGlobalContext();

  if (loading === false) {
    console.log('aaaaaaaaaaa', products.data.totalItems);
  }

  function onShowSizeChange(current, pageSize) {
    // console.log(current, pageSize);
    // setPageSize(pageSize);
  }

  function onPageChange(current, pageSize) {
    console.log(current, pageSize);
    setCurrent(current);
    setPageSize(pageSize);
  }
  const MyPagination = ({ total, onChange, current }) => {
    return (
      <Pagination
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
      />
    );
  };

  return loading ? (
    <AntLoader />
  ) : (
    // <Layout className='site-layout'>
    <Content style={{ margin: '0 16px' }}>
      <Divider>
        <Space align='baseline' size={[16, 16]} wrap>
          {products.data.map((item) => {
            console.log(item);
            return <AntProduct key={item.foodId} {...item} />;
          })}
        </Space>
      </Divider>
      <Divider>
        <Col span={12}>
          <MyPagination
            total={
              !keyword || keyword.length === 0
                ? products.totalItems
                : products.data.length
            }
            current={current}
            onChange={onPageChange}
          />
        </Col>
      </Divider>
    </Content>
  );
  // </Layout>
};

export default withRouter(AntProductList);
