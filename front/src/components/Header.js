import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/image.png'

function Header() {
    return (
        <header>
            <br />
            <Navbar bg="light" data-bs-theme="light" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                src={logo}
                                alt="Brand Logo"
                                height="30"
                                className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Nav className="me-auto">
                        <LinkContainer to="/retros">
                            <Nav.Link>Retro Kits</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/FAQ">
                            <Nav.Link>FAQ</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ml-auto">
                        <LinkContainer to="/Login">
                            <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Cart">
                            <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header