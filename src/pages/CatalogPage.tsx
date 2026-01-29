// pages/CatalogPage.tsx

import React from 'react';
import {useProducts} from '../hooks/useProducts';
import {useCategories} from '../hooks/useCategories';
import {useProductsStore} from '../stores/productsStore';
import {ProductList} from '../components/ProductList/ProductList';
import {CategoryFilter} from '../components/CategoryFilter/CategoryFilter';
import {Pagination} from '../components/Pagination/Pagination';
import styles from './CatalogPage.module.scss';
import {createProduct} from "../lib/createProduct";
import type {Product} from "../types/product";

export const CatalogPage: React.FC = () => {
  const {data: products, isLoading: productsLoading, error: productsError} = useProducts();
  const {data: categories = [], isLoading: categoriesLoading, error: categoriesError} = useCategories();
  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  const {
    selectedCategory,
    searchTerm,
    page,
    limit,
    setSelectedCategory,
  } = useProductsStore();

  const filteredProducts: Product[] = React.useMemo(() => {
    if (isLoading) return Array.from({ length: 8 }, (_, index) => createProduct(index));
    if (!products || productsError) return [];
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, isLoading, productsError, selectedCategory, searchTerm]);

  const total = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );


  // ✅ Обработка ошибок
  if (error) {
    return <div
      className={styles['catalog-page__error']}>Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}</div>;
  }

  return (
    <div className={styles['catalog-page']}>
      <h1 className={styles['catalog-page__title']}>Каталог товаров{filteredProducts.length || ' пуст'}</h1>
      {
        !!filteredProducts.length &&
        <>
          <div className={styles['catalog-page__filters']}>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              loading={isLoading}
            />
          </div>

          <ProductList products={paginatedProducts} loading={isLoading}/>
          <Pagination
            page={page}
            total={total}
            limit={limit}
          />
        </>
      }
    </div>
  );
};
