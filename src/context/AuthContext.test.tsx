import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import type { User } from '../types';

const mockUser: User = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  gender: 'male',
  image: 'test-image.jpg',
  token: 'test-token-123'
};

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  test('should initialize with null user', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    expect(result.current.user).toBeNull();
  });

  test('should load user from localStorage on mount', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.user).toEqual(mockUser);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
  });

  test('should login user and save to localStorage', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    await act(async () => {
      await result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user', 
      JSON.stringify(mockUser)
    );
  });

  test('should logout user and remove from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.user).toEqual(mockUser);

    await act(async () => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
  });

  test('should handle empty localStorage', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.user).toBeNull();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
  });

  test('should throw error when useAuth is used outside AuthProvider', () => {
    const originalError = console.error;
    console.error = vi.fn();
    
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth debe ser usado dentro de un AuthProvider');

    console.error = originalError;
  });

  test('should maintain user state after login', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    await act(async () => {
      await result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
  });

  test('should handle invalid localStorage data gracefully', async () => {
    const originalError = console.error;
    console.error = vi.fn();
    
    localStorageMock.getItem.mockReturnValue('invalid-json');
    
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.user).toBeNull();
    
    console.error = originalError;
  });
});