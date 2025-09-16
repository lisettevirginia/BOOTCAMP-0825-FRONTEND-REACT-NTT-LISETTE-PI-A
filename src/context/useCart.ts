// contexts/useCart.ts
import { useContext } from 'react';
import { CartContext } from './CartContext';
import type { CartContextType } from '../types';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};