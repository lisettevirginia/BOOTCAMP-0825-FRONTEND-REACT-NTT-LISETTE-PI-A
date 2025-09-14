import React, { forwardRef } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className, ...props }, ref) => {
    return (
      <div className="input-container">
        <label className="input-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
        
        <input
          ref={ref}
          className={`input-field ${error ? 'input-error' : ''} ${className || ''}`}
          {...props}
        />
        
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;