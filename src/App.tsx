import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home'; 
import Cart from './pages/Cart/Cart'; // ← Importar el Cart real
import withAuth from './hocs/withAuth';
import './App.css';

const ProtectedHome = withAuth(Home);
const ProtectedCart = withAuth(Cart);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider> {/* ← Agregar CartProvider */}
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<ProtectedHome />} />
              <Route path="/cart" element={<ProtectedCart />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;