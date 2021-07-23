import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

//import page
import Home from './pages/Home';

import Login from './pages/Login';

import OrderDetail from './pages/OrderDetail';

import AdminListProducts from './pages/AdminListProducts';
import AdminProductEdit from './pages/AdminProductEdit';
import AdminListUsers from './pages/AdminListUsers';
import AdminUserEdit from './pages/AdminUserEdit';
import AdminListOrders from './pages/AdminListOrders';
import Admin from './components/AdminNav';

import AntAdminProductEdit from './pages/AntAdminProductEdit';
import AntAdminProductAdd from './pages/AntAdminProductAdd';
import AntdAdminListProducts from './pages/AntdAdminListProducts';
import AntAdminListCategory from './pages/AntAdminListCategory';
import AntAdminCategoryAdd from './pages/AntAdminCategoryAdd';
import AntAdminCategoryEdit from './pages/AntAdminCategoryEdit';
import AntAdminListOrders from './pages/AntAdminListOrders';
import AntAdminListUser from './pages/AntAdminListUser';
import AntProductDetail from './pages/AntProductDetail';
import AntCart from './pages/AntCart';
import AntOrder from './pages/AntOrder';
import AntError from './components/AntError';
import Logout from './components/Logout';
import { Layout } from 'antd';
import NotFound from './components/NotFound';
import AntOrderInfo from './pages/AntOrderInfo';

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  let isUser;
  let isAdmin;
  if (userInfo) {
    isUser = userInfo.roles
      .map(function (e) {
        return e;
      })
      .indexOf('ROLE_USER');

    isAdmin = userInfo.roles
      .map(function (e) {
        return e;
      })
      .indexOf('ROLE_ADMIN');
  }

  console.log('ussss', isUser, isAdmin, userInfo);
  return (
    <Router>
      <div className='App'>
        <Layout style={{ minHeight: '100vh' }}>
          <Admin />
          <Layout className='site-layout'>
            <Switch>
              <Route
                exact
                path='/admin/products'
                component={
                  isAdmin > -1
                    ? AntdAdminListProducts
                    : isUser > -1
                    ? AntError
                    : Login
                }
              />
              <Route
                exact
                path='/admin/products/add'
                component={
                  isAdmin > -1
                    ? AntAdminProductAdd
                    : isUser > -1
                    ? AntError
                    : Login
                }
              />
              <Route
                exact
                path='/admin/products/:id/edit'
                component={
                  isAdmin > -1
                    ? AntAdminProductEdit
                    : isUser > -1
                    ? AntError
                    : Login
                }
              />
              <Route
                exact
                path='/admin/category'
                component={
                  isAdmin > -1
                    ? AntAdminListCategory
                    : isUser > -1
                    ? AntError
                    : Login
                }
              />

              <Route
                exact
                path='/admin/category/add'
                component={
                  isAdmin > -1
                    ? AntAdminCategoryAdd
                    : isUser > -1
                    ? AntError
                    : Login
                }
              />
              <Route
                path='/admin/category/:id/edit'
                component={
                  isAdmin > -1
                    ? AntAdminCategoryEdit
                    : isUser > -1
                    ? AntError
                    : Login
                }
              />
              <Route
                exact
                path='/admin/orders'
                component={
                  isAdmin > -1
                    ? AntAdminListOrders
                    : isUser > -1
                    ? AntError
                    : Login
                }
              />
              <Route
                exact
                path='/admin/users'
                component={
                  isAdmin > -1
                    ? AntAdminListUser
                    : isUser > -1
                    ? AntError
                    : Login
                }
              />

              <Route exact path='/products/:id' component={AntProductDetail} />
              <Route
                exact
                path='/cart/:id?'
                component={
                  isUser > -1 ? AntCart : isAdmin > -1 ? AntError : Login
                }
              />
              <Route
                exact
                path='/orders'
                component={
                  isUser > -1 ? AntOrder : isAdmin > -1 ? AntError : Login
                }
              />

              <Route path='/logout' component={Logout} />
              {/*  */}

              <Route exact path='/' component={Home} />

              <Route path='/login' component={Login} />

              <Route
                path='/myorder'
                component={
                  isUser > -1 ? AntOrderInfo : isAdmin > -1 ? AntError : Login
                }
              />

              <Route path='*' component={NotFound} />
            </Switch>
          </Layout>
        </Layout>
      </div>

      <Container>
        <Switch>
          {/* <Route path='/login' component={Login} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/about' component={About} />
          <Route path='/products/:id' component={ProductDetail} />
          <Route path='/cart/:id?' component={Cart} />
          <Route exact path='/orders' component={Order} />
          <Route path='/orders/:id' component={OrderDetail} />
          <Route exact path='/admin/products' component={AdminListProducts} />

          <Route path='/admin/products/:id/edit' component={AdminProductEdit} />

          <Route exact path='/admin/users' component={AdminListUsers} />
          <Route path='/admin/users/:id/edit' component={AdminUserEdit} />

          <Route exact path='/admin/orders' component={AdminListOrders} />
          <Route path='*' component={Error} /> */}
        </Switch>
      </Container>
      {/* </main> */}
    </Router>
  );
}

export default App;
