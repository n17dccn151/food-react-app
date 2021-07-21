import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions.js';
import NumberFormat from 'react-number-format';
import {
  Row,
  Col,
  Image,
  Typography,
  Form,
  Button,
  Input,
  Rate,
  InputNumber,
  Space,
} from 'antd';
const { Title, Paragraph, Text, Link: LinkTy } = Typography;
const { TextArea } = Input;

const AntProductDetail = ({ match, history }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState({
    comments: [],
    submitting: false,
    value: '',
  });
  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match]);

  console.log(product);

  const addToCartHandler = () => {
    history.push(`/cartt/${match.params.id}?qty=${qty}`);
  };

  if (loading) {
    return <Loading />;
  }

  // console.log({ ...product.images }[0].url, ' ', match, '  ', history);

  function onChange(value) {
    console.log('changed', value);
  }
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          loading={submitting}
          onClick={onSubmit}
          type='primary'>
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  return loading ? (
    <></>
  ) : (
    <>
      <Row justify='space-around' align='middle'>
        <Col span={12} style={({ margin: '0 auto' }, { padding: '35px' })}>
          <Image
            width={400}
            src={{ ...product.images }[0].url}
            preview={{ visible: false }}
          />
        </Col>
        <Col span={12} style={({ margin: '0 auto' }, { padding: '35px' })}>
          <Title level={3}>{product.name}</Title>
          <Title level={4}>
            <NumberFormat
              style={{ color: '#0050b3' }}
              value={product.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$ '}
            />
          </Title>
          <Rate allowHalf disabled defaultValue={product.rate} />
          <Row style={{ marginTop: '16px' }}>
            <InputNumber
              min={1}
              max={product.quantity}
              defaultValue={1}
              onChange={onChange}
            />
          </Row>
          <Row>
            <Col style={{ marginTop: '16px' }}>
              <Button type='primary' onClick={addToCartHandler}>
                Add to cart
              </Button>
            </Col>
            <Col style={{ margin: '16px' }}>
              <Button type='primary'>Order now</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Space style={{ margin: '32px' }}>
        <Typography>
          <Title style={{ fontSize: '20px' }}>Description</Title>
          <Paragraph>
            In the process of internal desktop applications development, many
            different design specs and implementations would be involved, which
            might cause designers and developers difficulties and duplication
            and reduce the efficiency of development.
          </Paragraph>
        </Typography>
      </Space>
    </>
  );
};

export default AntProductDetail;
