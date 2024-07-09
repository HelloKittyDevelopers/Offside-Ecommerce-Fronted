import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { googleSuccess, googleFailure } from '../actions/googleActions.js';
import FormContainer from '../components/FormContainer';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './LoginScreen.css'; // Importa el archivo CSS

function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };

    const handleGoogleSuccess = (response) => {
        dispatch(googleSuccess(response));
    };

    const handleGoogleFailure = (response) => {
        googleFailure(response);
    };

    return (
        <FormContainer>
            <div className="login-screen">
                <h1>Login</h1>
                <p>Please enter your Login and your Password</p>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username' className='form-group-spacing'>
                        <Form.Control
                            type='text'
                            placeholder='Username or E-mail'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='password' className='form-group-spacing'>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <Button type='submit' variant='primary' className='form-group-spacing login-button'>
                        Login
                    </Button>
                </Form>

                <GoogleLoginButton onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} className='google-login-button' />

                <Row className='py-3'>
                    <Col className="register-link">
                        Not a member yet?{' '}
                        <Link to={`/users/register?redirect=${redirect}`}>
                            Register!
                        </Link>
                    </Col>
                </Row>
            </div>
        </FormContainer>
    );
}

export default LoginScreen;
