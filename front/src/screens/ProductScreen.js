import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import ProductService from '../service/ProductService';

function ProductScreen() {
    const { id } = useParams(); // Ensure this gets the correct id from the URL
    const [product, setProduct] = useState({}); // Initialize product as an empty object
    const [size, setSize] = useState(''); // State for handling selected size

    useEffect(() => {
        // Function to fetch product data from API
        async function fetchProduct() {
            try {
                const productData = await ProductService.getAll();
                console.log(productData); // product data
                const { data } = await axios.get(`/api/products/${id}/`); // GET request to API
                setProduct(data); // Update state with fetched data
                console.log('Fetched product data:', data); // Log the fetched data
            } catch (error) {
                console.error('Error fetching product:', error); // Error handling
            }
        }
        if (id) { // Ensure id is defined before calling the API
            fetchProduct(); // Call the function to fetch product data
        } else {
            console.error('No product id found in the URL.'); // Log if id is undefined
        }
    }, [id]); // Dependency array ensures this effect runs when id changes

    return (
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.product_name}</h3>
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
}

export default ProductScreen;
