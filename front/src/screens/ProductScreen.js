import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  const [size, setSize] = useState(product.sizes ? product.sizes[0] : '');

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            {product.sizes && (
              <ListGroup.Item>
                <Form.Group controlId="size">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    as="select"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {product.sizes.map((s) => (
                      <option key={s.size} value={s.size}>
                        {`${s.size} (${s.countInStock} available)`}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </ListGroup.Item>
            )}
            <ListGroup.Item className="d-flex justify-content-center">
              <Button
                className="btn btn-primary btn-lg btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductScreen;
