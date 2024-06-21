import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <div>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route path="/home/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/" element={<Navigate to="/home/" />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
