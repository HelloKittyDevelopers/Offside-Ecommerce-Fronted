import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/CartActions'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function CartScreen() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const qty = searchParams.get('qty') || 1;
    const size = searchParams.get('size');

    console.log('id', id);
    console.log('qty', qty);
    console.log('size', size);

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const {cartItems} =cart
    console.log('cartItems', cartItems)



    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty, size));
        }
    }, [dispatch, id, qty, size]);

    return (
        <div>
            <h1>CartScreen</h1>
            <p>Product ID: {id}</p>
            <p>Quantity: {qty}</p>
            <p>Size: {size}</p>
        </div>
    );
}

export default CartScreen;
