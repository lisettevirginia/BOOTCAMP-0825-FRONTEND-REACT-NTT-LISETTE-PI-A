import React from "react";
import './Button.css';

interface ButtonProps{
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secundary';
    disable?: boolean;
}

const Button: React.FC<ButtonProps> =({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disable = false
}) => {
    return(
    <button
    type={type}
    onClick={onClick}
    className={`button button-${variant}`}
    disabled={disable}
    >
        {children}
    </button>
    );

};

export default Button;