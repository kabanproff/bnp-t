import envConfig from './envConfig';
import type {Product} from '../types/product';

interface ApiConfig {
  baseUrl: string;
  endpoints: {
    products: string;
    categories: string;
    product: (id: number) => string;
    category: (category: string) => string;
  };
}

export const API_CONFIG: ApiConfig = {
  baseUrl: envConfig.baseUrl,
  endpoints: {
    products: '/products',
    categories: '/products/categories',
    product: (id: number) => `/products/${id}`,
    category: (category: string) => `/products/category/${category}`
  }
};

export const apiFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response;
};


export const apiUrls = {
  getProducts: (category?: string): string => {
    const endpoint = category && category !== 'all'
      ? API_CONFIG.endpoints.category(category)
      : API_CONFIG.endpoints.products;
    return `${API_CONFIG.baseUrl}${endpoint}`;
  },
  getCategories: (): string => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.categories}`,
  getProduct: (id: number): string => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.product(id)}`
};

export const api = {
  getProducts: async (category?: string): Promise<Product[]> => {
    const url = apiUrls.getProducts(category);
    const response = await apiFetch(url);
    return response.json();
  },
  getCategories: async (): Promise<string[]> => {
    const url = apiUrls.getCategories();
    const response = await apiFetch(url);
    return response.json();
  },
  getProduct: async (id: number): Promise<Product> => {
    const url = apiUrls.getProduct(id);
    const response = await apiFetch(url);
    return response.json();
  }
};
