// src/utils/queryHooks/useProductById.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/apiConfig';

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const product = await api.getProduct(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    },
    enabled: id > 0, // не запрашивать, если id не передан
    retry: 1,
  });
};
