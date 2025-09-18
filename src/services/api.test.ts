import { describe, test, expect, vi, beforeEach } from 'vitest';
import { apiService, type ApiResponse, type Category, type Product } from './api';

describe('ApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks(); // Restaura todos los mocks, incluyendo globales
  });

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
      images: [
        'https://cdn.dummyjson.com/product-images/1/1.jpg',
        'https://cdn.dummyjson.com/product-images/1/2.jpg'
      ]
    }
  ];

  const mockApiResponse: ApiResponse = {
    products: mockProducts,
    total: 100,
    skip: 0,
    limit: 30
  };

  const mockCategories: Category[] = [
    { slug: 'smartphones', name: 'Smartphones' },
    { slug: 'laptops', name: 'Laptops' }
  ];

  describe('getProducts', () => {
    test('should fetch products with default parameters', async () => {
      // Mock fetch usando vi.stubGlobal
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      }));

      const result = await apiService.getProducts();

      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=30&skip=0'
      );
      expect(result).toEqual(mockApiResponse);
    });

    test('should fetch products with custom parameters', async () => {
      const customResponse = { ...mockApiResponse, limit: 10, skip: 5 };
      
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => customResponse,
      }));

      const result = await apiService.getProducts(10, 5);

      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=10&skip=5'
      );
      expect(result.limit).toBe(10);
      expect(result.skip).toBe(5);
    });

    test('should throw error when fetch fails', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }));

      await expect(apiService.getProducts()).rejects.toThrow(
        'Error fetching products'
      );
    });
  });

  describe('getCategories', () => {
    test('should fetch categories successfully', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCategories,
      }));

      const result = await apiService.getCategories();

      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/categories'
      );
      expect(result).toEqual(mockCategories);
    });

    test('should throw error when categories fetch fails', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }));

      await expect(apiService.getCategories()).rejects.toThrow(
        'Error fetching categories'
      );
    });
  });

  describe('getProductsByCategory', () => {
    test('should fetch products by category successfully', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      }));

      const result = await apiService.getProductsByCategory('smartphones');

      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/category/smartphones'
      );
      expect(result).toEqual(mockApiResponse);
    });

    test('should throw error when category products fetch fails', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }));

      await expect(apiService.getProductsByCategory('invalid-category')).rejects.toThrow(
        'Error fetching products by category'
      );
    });

    test('should handle category names with special characters', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      }));

      const category = 'home-decoration';
      await apiService.getProductsByCategory(category);

      expect(fetch).toHaveBeenCalledWith(
        `https://dummyjson.com/products/category/${category}`
      );
    });
  });

  describe('searchProducts', () => {
    test('should search products successfully', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      }));

      const query = 'iphone';
      const result = await apiService.searchProducts(query);

      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/search?q=iphone'
      );
      expect(result).toEqual(mockApiResponse);
    });

    test('should encode special characters in search query', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      }));

      const query = 'samsung galaxy s21';
      await apiService.searchProducts(query);

      expect(fetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/search?q=samsung%20galaxy%20s21'
      );
    });

    test('should throw error when search fails', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }));

      await expect(apiService.searchProducts('test')).rejects.toThrow(
        'Error searching products'
      );
    });
  });

  describe('error handling', () => {
    test('should handle network errors', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

      await expect(apiService.getProducts()).rejects.toThrow('Network error');
    });
  });
});