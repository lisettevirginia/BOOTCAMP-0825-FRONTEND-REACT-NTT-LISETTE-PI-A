import React from 'react';
import './Input.css';

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  // Nuevas props para react-hook-form
  register?: any;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  register,
  name,
  ...props
}) => {
  return (
    <div className="input-container">
      <label className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      
      {register && name ? (
        // Para react-hook-form
        <input
          type={type}
          placeholder={placeholder}
          className={`input-field ${error ? 'input-error' : ''}`}
          {...register(name)}
          {...props}
        />
      ) : (
        // Para uso normal
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${error ? 'input-error' : ''}`}
          {...props}
        />
      )}
      
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;