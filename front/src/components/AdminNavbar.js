import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaBars, FaBox, FaUsers, FaClipboardList } from 'react-icons/fa';
import './AdminNavbar.css';

function AdminNavbar({ isExpanded, setIsExpanded }) {
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const collapseNavbar = () => {
    setIsExpanded(false);
  };

  return (
    <Nav className={`admin-sidebar ${isExpanded ? 'admin-sidebar-expanded' : 'admin-sidebar-collapsed'} bg-light`}>
      <Button onClick={toggleNavbar} variant="light" className="mb-3">
        <FaBars />
      </Button>
      {isExpanded && (
        <>
          <LinkContainer to="/admin/products" onClick={collapseNavbar}>
            <Nav.Link><FaBox /> <span className="ms-3">Productos</span></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/users" onClick={collapseNavbar}>
            <Nav.Link><FaUsers /> <span className="ms-3">Usuarios</span></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/orders" onClick={collapseNavbar}>
            <Nav.Link><FaClipboardList /> <span className="ms-3">Órdenes</span></Nav.Link>
          </LinkContainer>
        </>
      )}
    </Nav>
  );
}

export default AdminNavbar;