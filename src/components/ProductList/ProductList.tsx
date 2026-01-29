import React from 'react';
import {PCard} from '../PCard/PCard';
import styles from './ProductList.module.scss';
import type {Product} from "../../types/product";

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({products, loading}) => {
  return (
    <div className={styles['product-list']}>
      {products.map(product => (
        <PCard key={product.id} product={product} loading={loading}/>
      ))
      }
    </div>
  );
};
