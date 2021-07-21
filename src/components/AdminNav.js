import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout, Menu, Input, Divider, Space, Col, Row, Image } from 'antd';
import { withRouter } from 'react-router';
import logo from '../logo.svg';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  BarsOutlined,
  ShoppingOutlined,
  BellOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
// import { Row } from 'react-bootstrap';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;
const Admin = ({ history, match }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const { Search } = Input;
  const { location } = history;

  return location.pathname.split('/')[1] === 'admin' ? (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className='logo'>
        <img src=''></img>
      </div>
      <Menu
        theme='dark'
        defaultSelectedKeys={[`${location.pathname.split('/')[2]}`]}
        mode='inline'>
        <Menu.Item key='dashboardd' icon={<PieChartOutlined />}>
          Dashboald
          <Link to='/admin/dashboardd' />
        </Menu.Item>

        <Menu.Item key='categoryy' icon={<BarsOutlined />}>
          Category
          <Link to='/admin/categoryy' />
        </Menu.Item>
        <Menu.Item key='productss' icon={<ShopOutlined />}>
          Product
          <Link to='/admin/productss' />
        </Menu.Item>

        <Menu.Item key='orderss' icon={<ShoppingOutlined />}>
          Order
          <Link to='/admin/orderss' />
        </Menu.Item>
        <Menu.Item key='userss' icon={<TeamOutlined />}>
          Customer
          <Link to='/admin/userss' />
        </Menu.Item>
        <Menu.Item key='6' icon={<DesktopOutlined />}>
          Admin
        </Menu.Item>

        <Menu.Item key='7' icon={<FileOutlined />}>
          ----
        </Menu.Item>
        <Menu.Item key='8' icon={<FileOutlined />}>
          ----
        </Menu.Item>
      </Menu>
    </Sider>
  ) : (
    <Header>
      <Row>
        <Col span={4}>
          <div className='logo'>
            <Link to='/'>
              <Image
                width={80}
                src={logo}
                alt='cocktail db logo'
                className='logo'
                preview={{ visible: false }}
              />
            </Link>
          </div>
        </Col>
        <Col span={8}>
          <Search
            style={{ margin: '16px' }}
            placeholder='input search text'
            // onSearch={onSearch}
            enterButton
          />
        </Col>

        <Col span={4}></Col>
        <Col span={8}>
          <Menu theme='dark' mode='horizontal'>
            <Menu.Item key='cart' icon={<ShoppingOutlined />}>
              <Link to='/cartt' />
            </Menu.Item>
            <Menu.Item key='noti' icon={<BellOutlined />}>
              <Link to='/cartt' />
            </Menu.Item>
            {/* <Menu.Item key='account' icon={<UserOutlined />}>
              <Link to='/cartt' />
            </Menu.Item> */}
            <SubMenu key='account' icon={<UserOutlined />}>
              <Menu.Item key='3'>Order Info</Menu.Item>
              <Menu.Item key='4'>User Info</Menu.Item>
              <Menu.Item key='5'>Logout</Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default withRouter(Admin);
