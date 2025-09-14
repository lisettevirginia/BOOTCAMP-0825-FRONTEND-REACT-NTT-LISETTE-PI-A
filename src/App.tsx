import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/login';
import withAuth from './components/common/withAuth';
import './App.css';

// Componentes protegidos (los crearemos después)
const Home = () => <div>Home Page - Bienvenido!</div>;
const Cart = () => <div>Cart Page</div>;

const ProtectedHome = withAuth(Home);
const ProtectedCart = withAuth(Cart);

const App: React.FC = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;
