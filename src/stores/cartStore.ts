import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {Product} from "../types/product";

export interface CartStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (id: number) => number;
  generatedStock: Record<number, number>; // productId → stock
  generateStockForProduct: (id: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: (item.quantity ?? 0) + 1 }
                  : item
              )
            };
          } else {
            return {
              items: [...state.items, { ...product, quantity: 1 }]
            };
          }
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + (item.quantity ?? 0), 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * (item.quantity ?? 0)), 0);
      },

      getItemQuantity: (id) => {
        const item = get().items.find(item => item.id === id);
        return item?.quantity ?? 0;
      },

      generatedStock: {}, // будет сохраняться в localStorage

      generateStockForProduct: (id) => {
        // Проверяем, есть ли уже сгенерированный stock для этого товара
        const current = get().generatedStock[id];
        if (current !== undefined) {
          return current;
        }

        // Генерируем случайное значение от 1 до 20
        const randomStock = Math.floor(Math.random() * 20) + 1;

        // Сохраняем в store (и автоматически в localStorage благодаря persist)
        set((state) => ({
          generatedStock: {
            ...state.generatedStock,
            [id]: randomStock,
          },
        }));

        return randomStock;
      },
    }),
    {
      name: 'cart-storage', // ключ для localStorage
      version: 1,
      // ✅ ВАЖНО: добавляем generatedStock в черный список, чтобы он сохранялся
      partialize: (state) => ({
        items: state.items,
        generatedStock: state.generatedStock, // сохраняем только эти два поля
      }),
    }
  )
);
