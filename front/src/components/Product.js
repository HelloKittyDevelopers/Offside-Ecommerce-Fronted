import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product.id_product}`}>
        {product.images && product.images.length > 0 ? (
          <Card.Img src={product.images[0].image} variant='top' />
        ) : (
          <Card.Img src='/placeholder-image.jpg' variant='top' /> // Placeholder image
        )}
      </Link>

      <Card.Body>
        <Link to={`/product/${product.id_product}`}>
          <Card.Title as='div'>
            <strong>{product.product_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            <Rating value={product.average_rating || 0} text={`${product.review_count || 0} reviews`} />
          </div>
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;