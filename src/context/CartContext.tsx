import React, { createContext, useReducer, ReactNode } from 'react';
import type { Product, CartState, CartAction, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
      }
      
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }

    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }

    case 'INCREMENT_ITEM': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }

    case 'DECREMENT_ITEM': {
      const updatedItems = state.items
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items
        .map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0 
  });

  const addItem = (product: Product) => {
    if (product.stock > 0) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const incrementItem = (productId: number) => {
    dispatch({ type: 'INCREMENT_ITEM', payload: productId });
  };

  const decrementItem = (productId: number) => {
    dispatch({ type: 'DECREMENT_ITEM', payload: productId });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      const product = state.items.find(item => item.id === productId);
      if (product && newQuantity > product.stock) {
        console.warn(`No hay suficiente stock. Máximo: ${product.stock}`);
        return;
      }
      
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: { productId, quantity: Math.min(newQuantity, product?.stock || newQuantity) } 
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      updateQuantity,
      clearCart,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;