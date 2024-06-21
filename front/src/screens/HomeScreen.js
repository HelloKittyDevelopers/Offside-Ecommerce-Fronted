import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Vid from '../components/Vid';
import axios from 'axios';

function HomeScreen() {
    const [products, setProducts] = useState([]);  // Estado local para almacenar los productos

    useEffect(() => {
        // Función para obtener productos desde la API
        async function fetchProducts() {
            console.log() 
            try {
                const { data } = await axios.get('/home/products/');
                 // Petición GET a la API
                setProducts(data);  // Actualizamos el estado con los datos obtenidos
            } catch (error) {
                console.error("Error fetching products:", error);  // Manejo de errores
            }
        }
        fetchProducts();  // Llamamos a la función para obtener los productos
    }, []);  // El array vacío asegura que este efecto se ejecute solo una vez, cuando el componente se monta

    return (
        <div>
            <Vid />
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product.id_product} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HomeScreen;