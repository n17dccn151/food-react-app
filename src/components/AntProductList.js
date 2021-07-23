import React, { useEffect } from 'react';
import AntProduct from './AntProduct';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js';
import { Layout, Row, Divider, Space, Col, Pagination } from 'antd';
import AntLoader from '../components/AntLoading';
const AntProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const { Header, Content, Footer, Sider } = Layout;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  //const { foods, loading } = useGlobalContext();

  const pageSize = 10;
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

  return loading ? (
    <AntLoader />
  ) : (
    // <Layout className='site-layout'>
    <Content style={{ margin: '0 16px' }}>
      <Divider>
        <Space align='baseline' size={[16, 16]} wrap>
          {products.map((item) => {
            console.log(item);
            return <AntProduct key={item.foodId} {...item} />;
          })}
        </Space>
      </Divider>
      <Divider>
        <Pagination defaultCurrent={1} total={500} />
      </Divider>
    </Content>
  );
  // </Layout>
};

export default AntProductList;
