import React, {useRef, useState} from 'react';
import ChevronDownIcon from '../../assets/chevron-down.svg?react';
import styles from './CategoryFilter.module.scss';
import clsx from 'clsx';

interface CategoryFilterProps {
  categories: string[] | undefined;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading: boolean;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
                                                                categories,
                                                                selectedCategory,
                                                                onCategoryChange,
                                                                loading
                                                              }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const getDisplayLabel = (category: string) => {
    return category === 'all' ? 'Все' : category;
  };

  const selectedLabel = getDisplayLabel(selectedCategory);

  return (
    <div className={clsx({skeleton: loading}, styles['c-filter'])}>
      <span>Категория:</span>
      <div className={styles['c-filter__swrap']} ref={dropdownRef}>
        <button
          type="button"
          className={clsx(styles['c-filter__trigger'], {[styles['open']]: isOpen})}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`Выбрать категорию: ${selectedLabel}`}
        >
          <span className={styles['c-filter__selected']}>{selectedLabel}</span>
          <span className={styles['c-filter__sarrow']}>
            <ChevronDownIcon
              className={clsx(styles['select-icon'], {[styles['rotated']]: isOpen})}
              width="14"
            />
          </span>
        </button>

        {isOpen && categories && (
          <ul
            className={styles['c-filter__list']}
            role="listbox"
            aria-label="Список категорий"
          >
            {categories.map((category) => {
              const label = getDisplayLabel(category);
              const isSelected = category === selectedCategory;

              return (
                <li
                  key={category}
                  role="option"
                  aria-selected={isSelected}
                  className={clsx(styles['c-filter__item'], {
                    [styles['selected']]: isSelected,
                  })}
                  onClick={() => handleCategorySelect(category)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCategorySelect(category);
                    }
                  }}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
