import React from 'react';
import {useCartStore} from '../../stores/cartStore';
import styles from './CartItem.module.scss';
import type {Product} from "../../types/product";

interface CartItemProps {
  item: Product;
}

export const CartItem: React.FC<CartItemProps> = ({item}) => {
  const {updateQuantity, removeItem} = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className={styles.cartItem}>
      <img
        src={item.image}
        alt={item.title}
        className={styles.image}
      />

      <div className={styles.details}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.category}>{item.category}</p>
        <p className={styles.price}>${item.price}</p>
      </div>

      <div className={styles.quantityControls}>
        <button
          onClick={() => handleQuantityChange((item.quantity ?? 0) - 1)}
          className={styles.quantityButton}
        >
          -
        </button>

        <span className={styles.quantity}>{(item.quantity ?? 0)}</span>

        <button
          onClick={() => handleQuantityChange((item.quantity ?? 0) + 1)}
          className={styles.quantityButton}
        >
          +
        </button>
      </div>

      <div className={styles.subtotal}>
        ${(item.price * (item.quantity ?? 0)).toFixed(2)}
      </div>

      <button
        onClick={handleRemove}
        className={styles.removeButton}
        aria-label="Удалить товар"
      >
        ×
      </button>
    </div>
  );
};
