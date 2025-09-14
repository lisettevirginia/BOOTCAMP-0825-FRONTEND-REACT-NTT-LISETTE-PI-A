import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean; // ← AGREGA ESTA LÍNEA
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false // ← AGREGA ESTA LÍNEA
}) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`button button-${variant}`}
      disabled={disabled} // ← AGREGA ESTA LÍNEA
    >
      {children}
    </button>
  );
};

export default Button;