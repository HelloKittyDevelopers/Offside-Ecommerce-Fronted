import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaBars, FaBox, FaUsers, FaClipboardList, FaTags, FaChartBar, FaRuler } from 'react-icons/fa';
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
            <Nav.Link><FaBox /> <span className="ms-3">Products</span></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/users" onClick={collapseNavbar}>
            <Nav.Link><FaUsers /> <span className="ms-3">Users</span></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/orders" onClick={collapseNavbar}>
            <Nav.Link><FaClipboardList /> <span className="ms-3">Orders</span></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/types" onClick={collapseNavbar}>
            <Nav.Link><FaTags /> <span className="ms-3">Types</span></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/categories" onClick={collapseNavbar}>
            <Nav.Link><FaTags /> <span className="ms-3">Categories</span></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/sizes" onClick={collapseNavbar}>
            <Nav.Link><FaRuler /> <span className="ms-3">Sizes</span></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/" onClick={collapseNavbar}>
            <Nav.Link><FaChartBar /> <span className="ms-3">Reports</span></Nav.Link>
          </LinkContainer>
        </>
      )}
    </Nav>
  );
}

export default AdminNavbar;
