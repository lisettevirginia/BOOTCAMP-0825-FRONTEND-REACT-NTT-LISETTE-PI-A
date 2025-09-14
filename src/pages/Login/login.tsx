import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { User } from '../../types';
import './Login.css';

// Interface para los datos del formulario de login
interface LoginRequest {
  username: string;
  password: string;
}

// Interface para la respuesta de la API de DummyJSON
interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForgetPassword, setShowForgetPassword] = useState<boolean>(false);
  const [recoveryEmail, setRecoveryEmail] = useState<string>('');
  const [recoverySent, setRecoverySent] = useState<boolean>(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Por favor, completa todos los campos');
      setShowErrorModal(true);
      return false;
    }
    
    // Validar que no contenga solo espacios en blanco
    if (username.trim().length === 0 || password.trim().length === 0) {
      setErrorMessage('Los campos no pueden contener solo espacios en blanco');
      setShowErrorModal(true);
      return false;
    }
    
    return true;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const loginRequest: LoginRequest = { username, password };
      
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales inválidas');
      }
      
      const result: LoginResponse = await response.json();
      
      // Mapear la respuesta de la API al tipo User esperado por tu contexto
      const userData: User = {
        id: result.id,
        username: result.username,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        gender: result.gender,
        image: result.image,
        token: result.token
      };
      
      await login(userData);
      navigate('/home');
      
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Algo salió mal, inténtelo más tarde';
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgetPassword = (): void => {
    setShowForgetPassword(true);
    setRecoverySent(false);
  };

  const handlePasswordRecovery = (): void => {
    if (!recoveryEmail.trim()) {
      setErrorMessage('Por favor, ingresa tu correo electrónico');
      setShowErrorModal(true);
      return;
    }
    
    if (!validateEmail(recoveryEmail)) {
      setErrorMessage('Por favor, ingresa un correo electrónico válido');
      setShowErrorModal(true);
      return;
    }
    
    // Simular envío de correo (la API de DummyJSON no tiene endpoint para recuperación)
    setRecoverySent(true);
  };

  const closeModals = (): void => {
    setShowErrorModal(false);
    setShowForgetPassword(false);
    setRecoverySent(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
              placeholder="Tu nombre de usuario"
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        
        <button 
          className="forgot-password-button"
          onClick={handleForgetPassword}
          type="button"
          disabled={isLoading}
        >
          ¿Olvidaste tu contraseña?
        </button>
        
        {/* Información para testing */}
        <div className="dev-info">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Usuario: <code>kminchelle</code> | Contraseña: <code>0lelplR</code></p>
          <p>Usuario: <code>emilys</code> | Contraseña: <code>emilyspass</code></p>
        </div>
      </div>

      {/* Modal de error */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Error</h3>
            <p>{errorMessage}</p>
            <button onClick={closeModals}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal de recuperación de contraseña */}
      {showForgetPassword && !recoverySent && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Recuperar contraseña</h3>
            <p>Por favor, introduce tu correo electrónico para restablecer tu contraseña.</p>
            <input 
              type="email" 
              placeholder="correo@ejemplo.com" 
              className="email-input"
              value={recoveryEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecoveryEmail(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={closeModals}>Cancelar</button>
              <button onClick={handlePasswordRecovery}>Enviar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de envío */}
      {showForgetPassword && recoverySent && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Correo enviado</h3>
            <p>Se ha enviado un correo de recuperación a {recoveryEmail}. Por favor, revisa tu bandeja de entrada.</p>
            <button onClick={closeModals}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;