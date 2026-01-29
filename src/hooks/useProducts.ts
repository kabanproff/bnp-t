import { useQuery } from '@tanstack/react-query';
import { api } from '../config/apiConfig';
import type { Product } from '../types/product';

export const useProducts = (): ReturnType<typeof useQuery<Product[], Error>> => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      return api.getProducts();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // gcTime | cacheTime
    retry: 2,
  });
};
