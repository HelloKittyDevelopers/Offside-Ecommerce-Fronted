import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Rating from '../components/Rating';

function ProductScreen() {
    const { id_product } = useParams();
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const [size, setSize] = useState('');

    useEffect(() => {
        if (id_product) {
            dispatch(listProductDetails(id_product));
        } else {
            console.error('No product id found in the URL.');
        }
    }, [dispatch, id_product]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Row>
            <Col md={6}>
                {product.image ? (
                    <Image src={product.image} alt={product.product_name} fluid />
                ) : (
                    <p>No image available</p>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.product_name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.average_rating || 0} text={`${product.review_count || 0} reviews`} />
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
                        <ListGroup.Item>
                            <h4>Reviews</h4>
                            {product.reviews && product.reviews.length > 0 ? (
                                <ul>
                                    {product.reviews.map(review => (
                                        <li key={review.id}>{review.comment}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No reviews yet</p>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default ProductScreen;