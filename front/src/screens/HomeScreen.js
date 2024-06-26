import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Vid from '../components/Vid';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import image1 from '../assets/kaka.png'; // Adjust the path to your image file
import image2 from '../assets/always.png';
import your from '../assets/your.png';
import './HomeScreen.css'; // Import the CSS file

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <Vid />
      <Container fluid className="text-center my-4">
        <Row noGutters>
          <Col xs={12} sm={4} className="p-0">
            <img src={your} alt="Your Side" className="img-fluid fixed-size" />
          </Col>
          <Col xs={12} sm={4} className="p-0">
            <img src={image1} alt="Central Image" className="img-fluid fixed-size" />
          </Col>
          <Col xs={12} sm={4} className="p-0">
            <img src={image2} alt="Always By" className="img-fluid fixed-size" />
          </Col>
        </Row>
      </Container>
      <Container>
        <h1 className="latest-products-heading">Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.id_product} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default HomeScreen;
