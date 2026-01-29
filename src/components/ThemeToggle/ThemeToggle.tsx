import React from 'react';
import {useThemeStore} from '../../stores/themeStore.ts';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
  const {theme, toggleTheme} = useThemeStore();

  return (
    <button
      className={styles["theme-toggle"]}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <>
          🌙
          <span className="visually-hidden">Тёмная тема</span>
        </>
      ) : (
        <>
          ☀️
          <span className="visually-hidden">Светлая тема</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
