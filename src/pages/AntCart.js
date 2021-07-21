import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loading from '../components/Loading.js';
import { addToCart } from '../actions/cartActions';
import { userCart } from '../actions/cartActions.js';
import NumberFormat from 'react-number-format';
import {
  Row,
  Col,
  Image,
  Space,
  Card,
  Devider,
  Typography,
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Rate,
  InputNumber,
  Checkbox,
  Affix,
} from 'antd';
const { TextArea } = Input;

const { Title } = Typography;
const { Meta } = Card;

const AntCart = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // console.log(match);
  // console.log(location);
  // console.log(history);
  // const dispatch = useDispatch()
  // const cart = useSelector(state => state.cart)
  // const { cartItems } = cart

  // useEffect(() => {
  //     if (productId) {
  //         dispatch(addToCart(productId, qty))
  //     }
  // }, [dispatch, productId, qty])

  // const removeFromCartHandler = (id) => {
  //     dispatch(removeFromCart(id))
  // }

  // const checkoutHandler = () => {
  //   history.push('/login?redirect=shipping');
  // };

  const dispatch = useDispatch();
  const cartDetail = useSelector((state) => state.cart);
  const { loading, error, cart } = cartDetail;

  useEffect(() => {
    dispatch(userCart());
  }, [dispatch]);

  const dispatch1 = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch1(addToCart(productId, qty));
    }
  }, [dispatch1, productId, qty]);

  const checkoutHandler = () => {
    history.push('/login?redirect=placeorder');
  };

  if (loading) {
    return <Loading />;
  }

  console.log(cart);
  function onChange(value) {
    console.log('changed', value);
  }

  const CheckboxGroup = Checkbox.Group;

  return loading ? (
    <></>
  ) : (
    <>
      <Row style={{ margin: '16px' }} s>
        <Col span={16}>
          <Checkbox
          // indeterminate={indeterminate}
          // onChange={onCheckAllChange}
          // checked={checkAll}
          >
            <Title level={5}>Check All</Title>
          </Checkbox>
        </Col>
      </Row>

      <Row style={{ margin: '16px' }}>
        <Col span={16}>
          {cart.cartFoods.map((item) => (
            <Row style={{ marginTop: '16px' }}>
              <Col span={12}>
                <Row>
                  <CheckboxGroup
                  //   options={plainOptions}
                  //   value={checkedList}
                  //   onChange={onChange}
                  ></CheckboxGroup>
                  <Checkbox>
                    <Title level={5}>x</Title>
                  </Checkbox>
                  <Image width={200} src={item.image} />
                </Row>
              </Col>
              <Col span={12}>
                <Title level={4}>{item.name}</Title>

                <NumberFormat
                  style={{ color: '#0050b3' }}
                  value={item.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$ '}
                />

                <Row>
                  <InputNumber
                    min={1}
                    max={500}
                    defaultValue={item.amount}
                    onChange={onChange}
                  />
                  {/* <Button type='primary'>Delete</Button> */}
                </Row>
              </Col>
            </Row>
          ))}
        </Col>

        <Col span={8}>
          <Affix offsetTop={10} style={{ margin: '0 auto' }}>
            <Row>
              <Title level={4}>Total Price</Title>
            </Row>
            <Row>
              <NumberFormat
                style={{ color: '#0050b3' }}
                value={cart.cartFoods.reduce(
                  (acc, item) => acc + item.amount * item.price,
                  0
                )}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$ '}
              />
            </Row>
            <Row>
              <Col style={{ marginTop: '16px' }}>
                <Button type='primary'>Order</Button>
              </Col>
              <Col></Col>
            </Row>
          </Affix>
        </Col>
      </Row>
    </>
  );
};

export default AntCart;
