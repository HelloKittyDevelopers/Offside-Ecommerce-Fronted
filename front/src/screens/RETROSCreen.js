import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFilteredProducts } from '../actions/productActions'; // Importa la acción correcta
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

function RETROScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listFilteredProducts('Retro')); // Despacha la acción con el tipo 'retro'
  }, [dispatch]);

  return (
    <div>
      <h1>Retro Kits</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id_product} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default RETROScreen;
