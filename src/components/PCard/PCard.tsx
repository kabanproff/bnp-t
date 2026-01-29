import React, {useMemo, useCallback} from 'react';
import clsx from 'clsx';
import type {Product} from '../../types/product';
import {useCartStore} from '../../stores/cartStore';
import {useItemQuantity} from '../../hooks/useItemQuantity';
import styles from './PCard.module.scss';
import {useToastStore} from "../../stores/toastStore.ts";

interface ProductCardProps {
  product: Product,
  loading: boolean,
}

export const PCard: React.FC<ProductCardProps> = ({product, loading}) => {
  const {addItem} = useCartStore();
  const {addToast} = useToastStore();

  const quantityInCart = useItemQuantity(product.id);

  const productStock = useCartStore((state) => state.generatedStock[product.id]);

  const stockStatus = useMemo(() => {
    if (product.stock !== undefined && product.stock !== null) {
      if (product.stock === 0) return 'out-of-stock';
      if (product.stock <= 3) return 'low-stock';
      return 'in-stock';
    }

    if (productStock === undefined) return 'in-stock';
    if (productStock <= 3) return 'low-stock';
    return 'in-stock';
  }, [product.stock, productStock]);

  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(product.price);
  }, [product.price]);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (stockStatus === 'out-of-stock') return;
      addItem(product);
      addToast(`${product.title} добавлен в корзину!`, 'success')
    },
    [addItem, addToast, product, stockStatus]
  );

  const handleCardClick = useCallback(() => {
    console.log('Открыть продукт по id', product.id);
  }, [product.id]);

  const getStockText = () => {
    if (stockStatus === 'out-of-stock') return 'Нет в наличии';
    if (stockStatus === 'low-stock') {
      const stockValue = product.stock !== undefined ? product.stock : productStock;
      return `Только ${stockValue} шт.`;
    }
    return 'В наличии';
  };

  return (
    <div className={clsx({skeleton: loading}, styles.pcard)} onClick={handleCardClick}>
      <div className={styles.pcard__ibox}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.pcard__img}
          loading="lazy"
        />
        {product.rating && (
          <div className={styles.pcard__rating}>
            <span className={styles.pcard__stars}>★</span>
            <span className={styles.pcard__value}>
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        )}
      </div>

      <div className={styles.pcard__content}>
        <div className={styles.pcard__category}>{product.category}</div>
        <h3 className={styles.pcard__title}>{product.title}</h3>
        <p className={styles.pcard__description}>{product.description}</p>
        <div className={styles.pcard__footer}>
          <div className={styles.pcard__price}>{formattedPrice}</div>
          <div
            className={clsx(styles.pcard__stock, {
              [styles['pcard__stock--in-stock']]: stockStatus === 'in-stock',
              [styles['pcard__stock--low-stock']]: stockStatus === 'low-stock',
              [styles['pcard__stock--out-of-stock']]: stockStatus === 'out-of-stock',
            })}
          >
            {getStockText()}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          aria-disabled={stockStatus === 'out-of-stock'}
          className={clsx(styles.pcard__btn, {
            [styles['pcard__btn--added']]: quantityInCart > 0,
            [styles['pcard__btn--disabled']]: stockStatus === 'out-of-stock',
          })}
          aria-label={
            stockStatus === 'out-of-stock'
              ? 'Товар отсутствует'
              : quantityInCart > 0
                ? `В корзине ${quantityInCart} шт. - Добавить еще`
                : 'Добавить в корзину'
          }
          disabled={stockStatus === 'out-of-stock'}
        >
          {quantityInCart > 0 ? (
            <>
              <span className={styles.pcard__icon}>🛒</span>
              В корзине ({quantityInCart})
            </>
          ) : stockStatus === 'out-of-stock' ? (
            'Нет в наличии'
          ) : (
            <>
              <span className={styles.pcard__icon}>+</span>
              В корзину
            </>
          )}
        </button>
      </div>
    </div>
  );
};
