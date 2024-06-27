import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import AdminProductsScreen from './screens/admin_screen/product_screen/AdminProductsScreen';
import AdminUsersScreen from './screens/admin_screen/user_screen/AdminUsersScreen';
import AdminOrdersScreen from './screens/admin_screen/order_screen/AdminOrdersScreen';
import AdminScreen from './screens/admin_screen/AdminScreen';
import ProductListPage from './screens/admin_screen/product_screen/ProductListPage';
import OrderListPage from './screens/admin_screen/order_screen/OrderListPage';
import UserListPage from './screens/admin_screen/user_screen/UserListPage';
import './App.css';

function App() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  return (
    <div>
      <Routes>
        <Route 
          path="/admin*" 
          element={
            <Container fluid className="p-0">
              <Row className="g-0">
                <Col className={isNavbarExpanded ? 'col-md-3 col-lg-2' : 'col-auto'}>
                  <AdminNavbar 
                    isExpanded={isNavbarExpanded} 
                    setIsExpanded={setIsNavbarExpanded} 
                  />
                </Col>
                <Col>
                  <main className={`py-3 ${isNavbarExpanded ? 'admin-content-expanded' : 'admin-content-collapsed'}`}>
                    <Container fluid>
                      <Routes>
                        <Route path="/products/" element={<AdminProductsScreen />} />
                        <Route path="/products/list/" element={<ProductListPage />} />
                        <Route path="/users/" element={<AdminUsersScreen />} />
                        <Route path="/users/list/" element={<UserListPage />} />
                        <Route path="/orders/" element={<AdminOrdersScreen />} />
                        <Route path="/orders/list/" element={<OrderListPage />} />
                        <Route path="/" element={<AdminScreen />} />
                      </Routes>
                    </Container>
                  </main>
                </Col>
              </Row>
            </Container>
          } 
        />
        <Route 
          path="/*" 
          element={
            <>
              <Header />
              <main className="py-5">
                <Container>
                  <Routes>
                    <Route path="/product/:id_product/" element={<ProductScreen />} />
                    <Route path="/home/" element={<HomeScreen />} />
                    <Route path="/" element={<Navigate to="/home/" />} />
                  </Routes>
                </Container>
              </main>
              <Footer />
            </>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;