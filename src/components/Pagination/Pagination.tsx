import React, {useEffect} from 'react';
import styles from './Pagination.module.scss';
import {useProductsStore} from "../../stores/productsStore.ts";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
}

export const Pagination: React.FC<PaginationProps> = ({
                                                        page,
                                                        limit,
                                                        total,
                                                      }) => {
  const {
    setPage,
    setTotal,
  } = useProductsStore();
  useEffect(() => {
    setTotal(total);
  }, []);
  const maxPage = Math.ceil(total / limit);

  if (maxPage <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (maxPage <= maxVisible) {
      for (let i = 1; i <= maxPage; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push('...');

      const start = Math.max(2, page - 1);
      const end = Math.min(maxPage - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < maxPage - 2) pages.push('...');
      pages.push(maxPage);
    }

    return pages;
  };

  const handlePageClick = (pageNum: number | string) => {
    if (typeof pageNum === 'string') return;
    setTotal(total);
    setPage(pageNum);
  };

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      <button
        onClick={() => handlePageClick(page - 1)}
        disabled={page === 1}
        className={`${styles['pagination__button']} ${styles['pagination__button--prev']}`}
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {getPageNumbers().map((pageNum, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(pageNum)}
          className={`${styles['pagination__button']} ${
            typeof pageNum === 'number' && pageNum === page
              ? styles['pagination__button--current']
              : ''
          } ${typeof pageNum === 'string' ? styles['pagination__button--ellipsis'] : ''}`}
          aria-label={`Страница ${pageNum}`}
          disabled={typeof pageNum === 'string'}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => handlePageClick(page + 1)}
        disabled={page === maxPage}
        className={`${styles['pagination__button']} ${styles['pagination__button--next']}`}
        aria-label="Следующая страница"
      >
        →
      </button>
    </nav>
  );
};
