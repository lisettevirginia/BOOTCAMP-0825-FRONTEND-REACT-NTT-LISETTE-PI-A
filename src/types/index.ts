export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'INCREMENT_ITEM'; payload: number }
  | { type: 'DECREMENT_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  clearCart: () => void;
  getCartItemsCount: () => number;
}