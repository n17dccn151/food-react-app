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

//import component
import Navbar from './components/Navbar';
import Header from './components/Header';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/about' component={About} />
            <Route path='/products/:id' component={ProductDetail} />
            <Route path='/cart/:id?' component={Cart} />
            <Route exact path='/orders' component={Order} />
            <Route path='/orders/:id' component={OrderDetail} />
            <Route exact path='/admin/products' component={AdminListProducts} />
            <Route
              path='/admin/products/:id/edit'
              component={AdminProductEdit}
            />
            <Route exact path='/admin/users' component={AdminListUsers} />
            <Route path='/admin/users/:id/edit' component={AdminUserEdit} />
            <Route exact path='/admin/orders' component={AdminListOrders} />
            <Route path='*' component={Error} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
}

export default App;
