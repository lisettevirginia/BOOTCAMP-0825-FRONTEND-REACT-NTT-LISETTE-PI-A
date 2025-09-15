export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url?: string;
}

class ApiService {
  private baseUrl = 'https://dummyjson.com';

  async getProducts(limit = 30, skip = 0): Promise<ApiResponse> {
    const response = await fetch(
      `${this.baseUrl}/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error('Error fetching products');
    }
    return response.json();
  }

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseUrl}/products/categories`);
    if (!response.ok) {
      throw new Error('Error fetching categories');
    }
    return response.json();
  }

  async getProductsByCategory(category: string): Promise<ApiResponse> {
    const response = await fetch(
      `${this.baseUrl}/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error('Error fetching products by category');
    }
    return response.json();
  }

  async searchProducts(query: string): Promise<ApiResponse> {
    const response = await fetch(
      `${this.baseUrl}/products/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error('Error searching products');
    }
    return response.json();
  }
}

export const apiService = new ApiService();