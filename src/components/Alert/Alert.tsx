import React from 'react';
import './Alert.css';

interface AlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

const Alert: React.FC<AlertProps> = ({ isOpen, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-container">
        <div className="alert-header">
          <h3>{title}</h3>
        </div>
        <div className="alert-body">
          <p>{message}</p>
        </div>
        <div className="alert-footer">
          <button 
            className="alert-confirm-btn"
            onClick={onConfirm}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;