import React from 'react';
import type { Product } from '../../services/api';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-price">${product.price}</span>
          <span className="product-stock">{product.stock} disponibles</span>
          <span className="product-rating">⭐ {product.rating}</span>
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="add-to-cart-btn"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;