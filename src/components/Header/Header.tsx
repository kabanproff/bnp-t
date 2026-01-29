import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styles from './Header.module.scss';
import clsx from 'clsx';
import CartIndicator from '../CartIndicator/CartIndicator.tsx';
import {Search} from '../Search/Search';
import {useCartStore} from '../../stores/cartStore.ts';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export const Header: React.FC = () => {
  const location = useLocation();
  const {getTotalItems} = useCartStore();
  const totalItems = getTotalItems();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.header__navbar} role="navigation">
        <div className={clsx('container', styles.header__container)}>
          <Link to="/" className={styles.header__logo}>
            🛒 E-Store
          </Link>

          <Search className={styles["header__search--desk"]} placeholder="Найти товар..."/>

          <button
            type="button"
            className={clsx(styles.header__burger, isMenuOpen && styles.active)}
            aria-label="Открыть меню"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={styles.burger__line}></span>
            <span className={styles.burger__line}></span>
            <span className={styles.burger__line}></span>
          </button>

          <div
            className={clsx(
              styles.header__links,
              isMenuOpen && styles["header__links--active"]
            )}
          >
            <Link
              to="/products"
              className={`${styles.header__link} ${location.pathname === '/products' ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Каталог
            </Link>
            <Link
              to="/cart"
              className={clsx(!totalItems && styles["header__clink--disabled"],styles.header__clink)}
              onClick={() => setIsMenuOpen(false)}
            >
              Корзина
              <CartIndicator totalItems={totalItems}/>
            </Link>
            <div className={styles.themeToggleContainer}>
              <ThemeToggle/>
            </div>
            <Search className={styles["header__search--mob"]} placeholder="Найти товар..."/>
          </div>

        </div>
      </nav>
    </header>
  );
};
