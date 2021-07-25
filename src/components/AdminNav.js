import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions.js';
import SearchCustom from '../components/Search';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Layout,
  Menu,
  Input,
  Divider,
  Space,
  Col,
  Row,
  Image,
  Badge,
} from 'antd';
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
  LoginOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Admin = ({ history, match }) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  // const { Search } = Input;
  const { location } = history;

  const userLogin = useSelector((state) => state.userLogin);

  const checkLogout = () => {
    dispatch(logout());
    history.push('/login');
  };
  console.log('aaaaaaaa', userLogin);

  return location.pathname.split('/')[1] === 'admin' ? (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className='logo'>
        <img src=''></img>
      </div>
      <Menu
        theme='dark'
        defaultSelectedKeys={[`${location.pathname.split('/')[2]}`]}
        mode='inline'>
        <Menu.Item key='dashboard' icon={<PieChartOutlined />}>
          Dashboald
          <Link to='/admin/dashboard' />
        </Menu.Item>

        <Menu.Item key='category' icon={<BarsOutlined />}>
          Category
          <Link to='/admin/category' />
        </Menu.Item>
        <Menu.Item key='products' icon={<ShopOutlined />}>
          Product
          <Link to='/admin/products' />
        </Menu.Item>

        <Menu.Item key='orders' icon={<ShoppingOutlined />}>
          Order
          <Link to='/admin/orders' />
        </Menu.Item>
        <Menu.Item key='users' icon={<TeamOutlined />}>
          User
          <Link to='/admin/users' />
        </Menu.Item>
        <Menu.Item key='6' icon={<DesktopOutlined />} onClick={checkLogout}>
          Log out
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
          <Route render={({ history }) => <SearchCustom history={history} />} />

          {/* <Search
            style={{ margin: '16px' }}
            placeholder='input search text'
            // onSearch={onSearch}
            enterButton
          /> */}
        </Col>
        <Col span={4}></Col>
        {userLogin.userInfo != null ? (
          <>
            <Col span={8}>
              <Menu theme='dark' mode='horizontal'>
                <Menu.Item key='cart' icon={<ShoppingOutlined />}>
                  <Link to='/cart' />
                  <Badge count={99} size='small'></Badge>
                </Menu.Item>

                <Menu.Item key='noti' icon={<BellOutlined />}>
                  <Link to='/cart' />
                </Menu.Item>
                {/* <Menu.Item key='account' icon={<UserOutlined />}>
              <Link to='/cartt' />
            </Menu.Item> */}
                <SubMenu key='account' icon={<UserOutlined />}>
                  <Menu.Item key='3'>
                    My Order
                    <Link to='/myorder' />
                  </Menu.Item>
                  <Menu.Item key='4'>User Info</Menu.Item>
                  <Menu.Item key='5'>
                    Logout
                    <Link to='/logout' />
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </>
        ) : (
          <>
            <Col span={8}>
              <Menu theme='dark' mode='horizontal'>
                <Menu.Item key='login' icon={<LoginOutlined />} title='Login'>
                  <Link to='/login' />
                </Menu.Item>
              </Menu>
            </Col>
          </>
        )}
      </Row>
    </Header>
  );
};

export default withRouter(Admin);
