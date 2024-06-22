import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

function Product({ product, showReviews = false }) {
    return (
        <div>
            <Card className="my-3 p-3 rounded">
                <a href={`/product/${product.id_product}`}>
                    <Card.Img src={product.image} className='card-img-top' />
                </a>
                <Card.Body>
                    <a href={`/product/${product.id_product}`}>
                        <Card.Title as="div">
                            <strong>{product.product_name}</strong>
                        </Card.Title>
                    </a>

                    <Card.Text as="div">
                        <div className='my-3'>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </div>
                    </Card.Text>
                    <Card.Text as="h3">
                        ${product.price}
                    </Card.Text>

                    {showReviews && product.reviews && (
                        <div>
                            <h4>Reviews</h4>
                            <ul>
                                {product.reviews.map(review => (
                                    <li key={review.id}>{review.comment}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default Product;