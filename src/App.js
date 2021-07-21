import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

//import page
import Home from './pages/Home';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Error from './pages/Error';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
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

//import component
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Table, Button, Space, Layout, Menu, Breadcrumb } from 'antd';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      {/* <Header /> */}
      {/* <main className='py-3'> */}

      <Layout style={{ minHeight: '100vh' }}>
        <Admin />
        <Layout className='site-layout'>
          <Route
            exact
            path='/admin/productss'
            component={AntdAdminListProducts}
          />
          <Route path='/admin/productss/add' component={AntAdminProductAdd} />
          <Route
            path='/admin/productss/:id/edit'
            component={AntAdminProductEdit}
          />
          <Route
            exact
            path='/admin/categoryy'
            component={AntAdminListCategory}
          />
          <Route path='/admin/categoryy/add' component={AntAdminCategoryAdd} />
          <Route
            path='/admin/categoryy/:id/edit'
            component={AntAdminCategoryEdit}
          />
          <Route exact path='/admin/orderss' component={AntAdminListOrders} />
          <Route exact path='/admin/userss' component={AntAdminListUser} />

          <Route path='/productss/:id' component={AntProductDetail} />
          <Route path='/cartt/:id?' component={AntCart} />

          {/*  */}

          <Route exact path='/' component={Home} />

          <Route path='/login' component={Login} />
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
          {/* <Route path='*' component={Error} /> */}
        </Layout>
      </Layout>

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
