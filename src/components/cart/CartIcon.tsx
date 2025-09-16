import React from 'react';
import { useCart } from '../../context';
import { useNavigate } from 'react-router-dom';
import './CartIcon.css';

const CartIcon: React.FC = () => {
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getCartItemsCount();

  return (
    <div 
      className="cart-icon" 
      onClick={() => navigate('/cart')}
      style={{
        position: 'relative',
        cursor: 'pointer',
        padding: '8px',
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      
      {itemCount > 0 && (
        <span 
          className="cart-badge"
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: '#ff4444',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;