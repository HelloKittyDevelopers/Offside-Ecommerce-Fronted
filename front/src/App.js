import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ProductListingScreen from './screens/ProductListingScreen';
import AdminProductsScreen from './screens/admin_screen/product_screen/AdminProductsScreen';
import AdminScreen from './screens/admin_screen/AdminScreen';
import ProductListPage from './screens/admin_screen/product_screen/ProductListPage';
import TypeScreen from './screens/admin_screen/filter_screen/typeScreen';
import ProductTypesScreen from './screens/ProductTypesScreen';
import CategoryScreen from './screens/admin_screen/filter_screen/categoryScreen';
import SizeScreen from './screens/admin_screen/filter_screen/sizeScreen';
import OrdersScreen from './screens/admin_screen/order_screen/AdminOrdersScreen';
import OrderDetailScreen from './screens/admin_screen/order_screen/OrderDetailScreen';
import ShippingScreen from './screens/ShippingScreen'; 
import PaymentScreen from './screens/PaymentScreen';
import './App.css';
import PlaceOrderScreen from './screens/PlaceOrderScreen';


function App() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  return (
   
      <div>
        <Routes>
          <Route 
            path="/admin/*" 
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
                          <Route path="products/" element={<AdminProductsScreen />} />
                          <Route path="products/list/" element={<ProductListPage />} />
                          <Route path="orders/" element={<OrdersScreen />} />
                          <Route path="orders/:id_order" element={<OrderDetailScreen />} />
                          <Route path="types/" element={<TypeScreen />} />
                          <Route path="categories/" element={<CategoryScreen />} />
                          <Route path="sizes/" element={<SizeScreen />} />
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
                      <Route path="product/:id_product/" element={<ProductScreen />} />
                      <Route path="home/" element={<HomeScreen />} />
                      <Route path="/type/" element={<ProductTypesScreen />} />
            	        <Route path="/type/:type/" element={<ProductListingScreen />} />
            	        <Route path="/" element={<Navigate to="/home/" />} />
            	        <Route path="/cart" element={<CartScreen />} exact/>
                      <Route path="/" element={<Navigate to="/home/" />} />
                      <Route path="/shipping" element={<ShippingScreen />} />
                      <Route path="/payment" element={<PaymentScreen />} />
                      <Route path="/placeorder" element={<PlaceOrderScreen />} />
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