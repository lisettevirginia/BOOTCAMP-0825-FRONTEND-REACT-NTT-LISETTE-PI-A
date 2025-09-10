import React from 'react';
import './Input.css';

interface InputProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    required = false
}) => {
    return (
        <div  className="input-container">
            <label className="input-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input-flield ${error ? 'input-error' : ''}`}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Input;