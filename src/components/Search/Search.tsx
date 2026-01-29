import React, {useState, useEffect} from 'react';
import {useProductsStore} from '../../stores/productsStore.ts';
import styles from './Search.module.scss';

interface SearchProps {
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
                                                placeholder = "Найти товар...",
                                                className = "",
                                              }) => {
  const {searchTerm, setSearchTerm} = useProductsStore();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchTerm('');
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== searchTerm) {
        setSearchTerm(inputValue);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, searchTerm, setSearchTerm]);

  return (
    <div className={`${styles.search} ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={styles.search__inp}
        aria-label="Поиск товаров"
        name="search"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.search__btn}
          aria-label="Очистить поиск"
        >
          ✕
        </button>
      )}
      <span className={styles.search__icon}>🔍</span>
    </div>
  );
};
