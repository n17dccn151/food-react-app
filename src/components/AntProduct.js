import React from 'react';
import { Card, Col, Divider, Badge, Button, Row } from 'antd';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;

const AntProduct = ({
  images,
  name,
  foodId,
  description,
  categoryId,
  rate,
  status,
  quantity,
  price,
}) => {
  return (
    <Link to={`/products/${foodId}`}>
      <Col span={8}>
        <Badge.Ribbon text='Hot' color='cyan'>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt='example' src={{ ...images[0] }.url} alt={name} />}>
            <Meta title={name} />
            <Meta
              title={
                <NumberFormat
                  style={{ color: '#0050b3' }}
                  value={price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$ '}
                />
              }
            />
            <Divider>
              <Button
                type='primary'
                shape='round'
                icon={<ShoppingCartOutlined />}
                size='large'>
                Add to cart
              </Button>
            </Divider>
          </Card>
        </Badge.Ribbon>
      </Col>
    </Link>
  );
};

export default AntProduct;
