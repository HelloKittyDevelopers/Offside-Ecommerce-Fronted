import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProductService from '../service/ProductService';
import Rating from '../components/Rating';
import { listProductReviews } from '../actions/reviewActions';

function ProductScreen() {
    const { id_product } = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState({});
    const [size, setSize] = useState(''); // Inicializar el estado size
    const [averageRating, setAverageRating] = useState(0);
    const reviewList = useSelector((state) => state.reviewList);
    const { reviews, loading: loadingReviews, error: errorReviews } = reviewList;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await ProductService.getProductById(id_product);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchAverageRating = async () => {
            try {
                const data = await ProductService.getProductReviewAverage(id_product);
                setAverageRating(data.average_rating || 0);
            } catch (error) {
                console.error('Error fetching average rating:', error);
            }
        };

        if (id_product) {
            fetchProduct();
            fetchAverageRating();
            dispatch(listProductReviews(id_product));
        } else {
            console.error('No product id found in the URL.');
        }
    }, [id_product, dispatch]);

    return (
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.product_name} fluid />
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.product_name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={averageRating} text={`${product.numReviews} reviews`} />
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
                            {loadingReviews ? (
                                <p>Loading reviews...</p>
                            ) : errorReviews ? (
                                <p>{errorReviews}</p>
                            ) : (
                                <ul>
                                    {reviews.map(review => (
                                        <li key={review.id}>{review.comment}</li>
                                    ))}
                                </ul>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default ProductScreen;