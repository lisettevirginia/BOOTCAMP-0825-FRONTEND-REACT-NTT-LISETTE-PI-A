import { renderHook, act } from '@testing-library/react';
import CartProvider from './CartContext';
import { useCart } from '../hooks/useCart';
import type { Product } from '../types';

// Mock product data - solo propiedades esenciales
const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 100,
  stock: 10,
  brand: 'Test Brand',
  category: 'test-category',
  thumbnail: 'test-thumbnail.jpg',
  images: ['test-image.jpg']
} as Product; // Usamos "as Product" para evitar errores de propiedades faltantes

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  price: 200,
  stock: 5,
  brand: 'Test Brand 2',
  category: 'test-category-2',
  thumbnail: 'test-thumbnail-2.jpg',
  images: ['test-image-2.jpg']
} as Product;

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  test('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.total).toBe(0);
    expect(result.current.getCartItemsCount()).toBe(0);
  });

  test('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].id).toBe(mockProduct.id);
    expect(result.current.state.items[0].quantity).toBe(1);
    expect(result.current.state.total).toBe(mockProduct.price);
    expect(result.current.getCartItemsCount()).toBe(1);
  });

  test('should increment quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct); // Add same product again
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].quantity).toBe(2);
    expect(result.current.state.total).toBe(mockProduct.price * 2);
    expect(result.current.getCartItemsCount()).toBe(2);
  });

  test('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.total).toBe(0);
    expect(result.current.getCartItemsCount()).toBe(0);
  });

  test('should increment item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.incrementItem(mockProduct.id);
    });

    expect(result.current.state.items[0].quantity).toBe(2);
    expect(result.current.state.total).toBe(mockProduct.price * 2);
  });

  test('should decrement item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct); // Quantity = 2
      result.current.decrementItem(mockProduct.id);
    });

    expect(result.current.state.items[0].quantity).toBe(1);
    expect(result.current.state.total).toBe(mockProduct.price);
  });

  test('should remove item when decrementing to zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct); // Quantity = 1
      result.current.decrementItem(mockProduct.id);
    });

    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.total).toBe(0);
  });

  test('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity(mockProduct.id, 3);
    });

    expect(result.current.state.items[0].quantity).toBe(3);
    expect(result.current.state.total).toBe(mockProduct.price * 3);
  });

  test('should remove item when updating quantity to zero', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity(mockProduct.id, 0);
    });

    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.total).toBe(0);
  });

  test('should clear cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
      result.current.clearCart();
    });

    expect(result.current.state.items).toEqual([]);
    expect(result.current.state.total).toBe(0);
    expect(result.current.getCartItemsCount()).toBe(0);
  });

  test('should handle multiple different products', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });

    expect(result.current.state.items).toHaveLength(2);
    expect(result.current.state.total).toBe(mockProduct.price + mockProduct2.price);
    expect(result.current.getCartItemsCount()).toBe(2);
  });

  test('should calculate total correctly with multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper: TestWrapper });
    
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });

    const expectedTotal = (mockProduct.price * 2) + mockProduct2.price;
    expect(result.current.state.total).toBe(expectedTotal);
  });
});