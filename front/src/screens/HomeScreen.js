import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Vid from '../components/Vid';
import {  useDispatch,useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions'
function HomeScreen() {
    const dispatch= useDispatch()
    const productList =useSelector (state => state.productList)
    const {error, loading, products} = productList
    useEffect(() => {
        dispatch(listProducts())  // Llamamos a la función para obtener los productos
    }, [dispatch]);  // El array vacío asegura que este efecto se ejecute solo una vez, cuando el componente se monta

    return (
        <div>
            <Vid />
            <h1>Latest Products</h1>
            {loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product.id_product} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
        }
        </div>
    );
}

export default HomeScreen;