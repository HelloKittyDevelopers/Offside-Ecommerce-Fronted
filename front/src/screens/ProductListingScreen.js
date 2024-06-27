import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { listProductsByType } from '../actions/productListingActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';

function ProductListingScreen() {
    const { type } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [size, setSize] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const productsPerPage = 8; // Number of products per page

    const productListing = useSelector(state => state.productListing);
    const { error, loading, categories, products, sizes} = productListing;

    useEffect(() => {
        dispatch(listProductsByType(type, {
            category,
            minPrice,
            maxPrice,
            size,
            pageNumber,
            limit: productsPerPage
        }));
    }, [dispatch, type, category, minPrice, maxPrice, size, pageNumber]);

    const submitHandler = (e) => {
        e.preventDefault();
        setPageNumber(1);
        const queryParams = new URLSearchParams();
        if (category) queryParams.append('category', category);
        if (minPrice) queryParams.append('min_price', minPrice);
        if (maxPrice) queryParams.append('max_price', maxPrice);
        if (size) queryParams.append('size', size);

        navigate(`/products/${type}?${queryParams.toString()}`);
    };

    const handlePageChange = (pageNumber) => {
        setPageNumber(pageNumber);
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    //Pagination Logic
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <Button
                key={i}
                onClick={() => handlePageChange(i)}
                variant={i === pageNumber ? 'primary' : 'secondary'}
            >
                {i}
            </Button>
        );
    }

    // Divide products into sets based on productsPerPage
    const dividedProducts = [];
    for (let i = 0; i < products.length; i += productsPerPage) {
        dividedProducts.push(products.slice(i, i + productsPerPage));
    }

    // Select current products to render based on pageNumber
    const currentProducts = dividedProducts[pageNumber - 1] || [];


    return (
        <div>
            <h1>Products in {type}</h1>
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as='select' value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value=''>All</option>
                                {categories.map((cat) => (
                                    <option key={cat.id_category} value={cat.category}>{cat.category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId='minPrice'>
                            <Form.Label>Min Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter min price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId='maxPrice'>
                            <Form.Label>Max Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter max price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId='size'>
                            <Form.Label>Size</Form.Label>
                            <Form.Control as='select' value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value=''>All</option>
                                {sizes.map((sz) => (
                                    <option key={sz.id_size} value={sz.size}>{sz.size}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                    <Row>
                        {currentProducts && currentProducts.map((product) => (
                            <Col key={product.id_product} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    {/* Pagination */}
                    <Row className="justify-content-center mt-4">
                        <Col className="text-left" xs="4">
                            <Button
                                onClick={() => handlePageChange(pageNumber - 1)}
                                disabled={pageNumber === 1}
                            >
                                Previous
                            </Button>
                        </Col>
                        <Col className="text-center" xs="4">
                            {paginationButtons}
                        </Col>
                        <Col className="text-right" xs="4">
                            <Button
                                onClick={() => handlePageChange(pageNumber + 1)}
                                disabled={pageNumber === totalPages}
                            >
                                Next
                            </Button>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}


export default ProductListingScreen;
