import {useCartStore} from '../stores/cartStore';

export const useItemQuantity = (productId: number) => {
  return useCartStore((state) => {
    const item = state.items.find((i) => i.id === productId);
    return item?.quantity ?? 0;
  });
};
