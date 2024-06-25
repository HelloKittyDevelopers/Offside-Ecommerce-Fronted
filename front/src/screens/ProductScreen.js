import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/CartActions';
import Rating from '../components/Rating';

function ProductScreen() {
    const { id_product } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const [size, setSize] = useState('');
    const [qty, setQty] = useState('1');
    const [countInStock, setCountInStock] = useState(0);

    useEffect(() => {
        if (id_product) {
            dispatch(listProductDetails(id_product));
        } else {
            console.error('No product id found in the URL.');
        }
    }, [dispatch, id_product]);

    useEffect(() => {
        if (size && product.sizes) {
            const selectedSize = product.sizes.find(s => s.size === size);
            if (selectedSize) {
                setCountInStock(selectedSize.quantity);
                setQty('1');
            }
        }
    }, [size, product.sizes]);

    const addTocartHandler = () => {
        dispatch(addToCart(id_product, qty, size));
        navigate(`/cart?id=${id_product}&qty=${qty}&size=${size}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Row>
            <Col md={6}>
                {product.images && product.images.length > 0 ? (
                    <Image src={product.images[0].image} alt={product.product_name} fluid />
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
                                        <option value="">Select size</option>
                                        {product.sizes.map((s) => (
                                            <option key={s.size} value={s.size}>
                                                {`${s.size} (${s.quantity} available)`}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </ListGroup.Item>
                        )}
                        {size && (
                            <ListGroup.Item>
                                <Row>
                                    <Col> Qty </Col>
                                    <Col xs='auto' className='my-1'>
                                        <Form.Control
                                            as="select"
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                        >
                                            {
                                                [...Array(countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item className="d-flex justify-content-center">
                            <Button
                                onClick={addTocartHandler}
                                className="btn btn-primary btn-lg btn-block"
                                type="button"
                                disabled={countInStock === 0}
                            >
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Reviews</h4>
                            {product.reviews && product.reviews.length > 0 ? (
                                <ul>
                                    {product.reviews.map(review => (
                                        <li key={review.id_review}>{review.comment}</li>
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