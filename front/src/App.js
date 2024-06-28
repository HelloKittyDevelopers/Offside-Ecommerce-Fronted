import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductListingScreen from './screens/ProductListingScreen';


function App() {
  return (
    <div>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route path="/home/" element={<HomeScreen />} exact />
            <Route path="/product/:id_product/" element={<ProductScreen />} />
            <Route path="/type/:type/" element={<ProductListingScreen />} />
            <Route path="/" element={<Navigate to="/home/" />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/users/register/" element={<RegisterScreen />} exact />
            <Route path="/cart" element={<CartScreen />} exact/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
