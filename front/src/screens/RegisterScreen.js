import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/useractions';
import FormContainer from '../components/FormContainer';

function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register({ firstName, lastName, email, username, password }));
        }
    };
    
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        required 
                        type='text'
                        placeholder='Enter your first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter your last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        required
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter your username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        required
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;
