import {useQuery} from '@tanstack/react-query';
import {api} from '../services/apiConfig';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.getCategories();
      return ['all', ...response];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
