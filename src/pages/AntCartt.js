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

  const [checkAll, setCheckAll] = React.useState(false);
  const [checkedList, setCheckedList] = React.useState([]);

  //checkbox
  // const onCheckTest = (e) => {
  //   console.log(e.target.value);
  //   // setCheckedList(e.target.checked ? plainOptions : []);
  //   // setIndeterminate(false);
  //   setCheckAll(e.target.checked);
  // };

  // const onCheckAllChange = (e) => {
  //   //console.log(e.target.value);
  //   // setCheckedList(e.target.checked ? plainOptions : []);
  //   setIndeterminate(false);
  //   console.log('aa', e.target.checked);
  //   setCheckAll(e.target.checked);
  // };

  const onGroupChange = (e) => {
    console.log('onGroupChange', e.target.value);
    console.log('onGroupChange', e.target.checked);
    if (e.target.checked) {
      setCheckAll(false);
      setCheckedList([...checkedList, e.target.value]);
    } else {
      setCheckAll(false);
      const index = checkedList.indexOf(e.target.value);
      if (index > -1) {
        checkedList.splice(index, 1);
      }
    }
    console.log('chl', checkedList);
    // setCheckedList(checkedList);
  };

  const onCheck = (e) => {
    console.log('onCheck', e);

    if (e.target.checked) {
      setCheckAll(true);
      setCheckedList(cart.cartFoods);
    } else {
      setCheckAll(false);
      setCheckedList([]);
    }
    console.log('chl', checkedList);
  };

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
          <div style={{ borderBottom: '1px solid #E9E9E9' }}>
            <Checkbox onChange={onCheck} checked={checkAll}>
              Check all
            </Checkbox>
          </div>
        </Col>
      </Row>

      <Row style={{ margin: '16px' }}>
        <Col span={16}>
          {cart.cartFoods.map((item) => (
            <Row style={{ marginTop: '16px' }}>
              <Col span={12}>
                <Row>
                  <Checkbox value={item} onChange={onGroupChange}>
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
                value={checkedList.reduce(
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
