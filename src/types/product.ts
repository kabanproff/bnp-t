// src/types/product.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  stock?: number;
  quantity?: number;
}

// export interface ProductCardProps {
//   product: Product;
//   onAddToCart?: (product: Product) => void;
// }

// export interface ProductsState {
//   products: Product[];
//   categories: string[];
//   loading: boolean;
//   error: string | null;
//   selectedCategory: string;
//   fetchProducts: (category?: string) => Promise<void>;
//   fetchCategories: () => Promise<void>;
//   fetchProduct: (id: number) => Promise<Product | null>;
//   setSelectedCategory: (category: string) => void;
// }

// Типы для фильтров и пагинации
// export interface ProductFilters {
//   category?: string;
//   priceRange?: {
//     min: number;
//     max: number;
//   };
//   searchQuery?: string;
// }

// export interface PaginationInfo {
//   currentPage: number;
//   totalPages: number;
//   totalProducts: number;
//   productsPerPage: number;
// }
