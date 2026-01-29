import React from 'react';
import { useCartStore } from '../stores/cartStore';
import { CartItem } from '../components/CartItem/CartItem';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className={styles["CartItem-page"]}>
        <div className={styles["CartItem-page__empty"]}>
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из каталога</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["cart-page"]}>
      <div className={styles["cart-page__container"]}>
        <div className={styles["cart-page__header"]}>
          <h1>Корзина</h1>
          <button
            onClick={clearCart}
            className={styles["cart-page__btn"]}
          >
            Очистить корзину
          </button>
        </div>

        <div className={styles["cart-page__items"]}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className={styles["cart-page__footer"]}>
          <div className={styles["cart-page__total"]}>
            Итого: ${getTotalPrice().toFixed(2)}
          </div>
          <button className={styles["cart-page__checkout"]}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};
