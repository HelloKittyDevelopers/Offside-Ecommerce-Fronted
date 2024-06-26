import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import CartScreen from './CartScreen'; // Asegúrate de que la ruta sea correcta
import { login } from '../actions/useractions';
import FormContainer from '../components/FormContainer';

function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {e.preventDefault()
        console.log('Submitted')
    }
    return (
        <FormContainer>
            
            <h1>Iniciar sesión</h1>

            <Form onSubmit= {submitHandler}>

                <Form.Group controlId='username'>

                    <Form.Label>
                        Nombre de usuario
                    </Form.Label>

                    <Form.Control 
                        type='username'
                        placeholder='Ingresa tu nombre usuario'
                        value={username} 
                        onChange={(e)=> setUsername(e.target.value)}>
                    </Form.Control>

                </Form.Group>

                <Form.Group controlId='password'>

                    <Form.Label>
                        contraseña
                    </Form.Label>

                    <Form.Control type='password' 
                        placeholder='Ingresa tu contraseña'
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Ingresar
                </Button>
            </Form>
        </FormContainer>
    );
}

export default LoginScreen;
