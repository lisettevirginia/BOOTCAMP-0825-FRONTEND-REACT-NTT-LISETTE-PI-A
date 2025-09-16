import React from 'react';
import { useCart } from '../../context/useCart';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart: React.FC = () => {
  const { state, removeItem, incrementItem, decrementItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Carrito de Compras</h1>
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <button 
            onClick={() => navigate('/')}
            className="continue-shopping-btn"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      
      <div className="cart-items">
        {state.items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
            <div className="item-details">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-price">Precio: S/ {item.price.toFixed(2)}</p>
              <p className="item-stock">Stock: {item.stock}</p>
            </div>
            <div className="quantity-controls">
              <button 
                onClick={() => decrementItem(item.id)}
                disabled={item.quantity <= 1}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-number">{item.quantity}</span>
              <button 
                onClick={() => incrementItem(item.id)}
                disabled={item.quantity >= item.stock}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <div className="item-total">
              S/ {(item.price * item.quantity).toFixed(2)}
            </div>
            <button 
              onClick={() => removeItem(item.id)}
              className="remove-btn"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Resumen de Compra</h2>
        <p className="total-amount">Total: S/ {state.total.toFixed(2)}</p>
        <div className="cart-actions">
          <button 
            onClick={clearCart}
            className="clear-cart-btn"
          >
            Vaciar Carrito
          </button>
          <button className="checkout-btn">
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;