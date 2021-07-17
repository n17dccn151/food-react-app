import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions.js';
import Rating from '../components/Rating';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

const ProductDetail = ({ match, history }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match]);

  console.log(loading);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  if (loading) {
    return <Loading />;
  }

  // // console.log(product, ' ', match, '  ', history);

  if (!product) {
    return <h2 className='section-title'>no display</h2>;
  }

  // const { name, image, category, info, glass, instructions, ingredients } =
  //   product;
  return (
    <>
      <Link className='my-3 text-decoration-none' to='/'>
        <i className='fas fa-arrow-left'></i> Go back
      </Link>
      {
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rate}
                  text={`${product.numReviews} reviews`}
                  // text={` ${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Price: ${product.price}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h5>Price:</h5>
                    </Col>
                    <Col>
                      <h5>${product.price * qty}</h5>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.quantity > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.quantity).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <div className='d-grid gap-2'>
                    <Button
                      onClick={addToCartHandler}
                      type='submit'
                      variant='primary'
                      disabled={product.quantity === 0}>
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      }
    </>
  );
};

export default ProductDetail;
