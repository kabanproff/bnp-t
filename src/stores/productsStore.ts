// stores/productsStore.ts — ОБНОВЛЁННАЯ ВЕРСИЯ

import { create } from 'zustand';

// export interface Product {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
//   description: string;
//   image: string;
// }

export interface ProductsState {
  selectedCategory: string;
  searchTerm: string;
  page: number;
  limit: number;
  total: number;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  setPage: (page: number) => void;
  setTotal: (page: number) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  selectedCategory: 'all',
  searchTerm: '',
  page: 1,
  limit: 12,
  total: 0,


  setSelectedCategory: (category) => {
    set({ selectedCategory: category, page: 1 }); // сбрасываем страницу
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term, page: 1 }); // сбрасываем страницу
  },

  setPage: (page: number) => {
    const maxPage = Math.ceil(get().total / get().limit);
    const nextPage = Math.max(1, Math.min(page, maxPage));
    set({ page: nextPage });
  },

  setTotal: (total: number) => {
    set({ total });
  }
}));
