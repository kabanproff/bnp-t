import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CatalogPage } from './pages/CatalogPage'
import { CartPage } from './pages/CartPage'
import { Header } from './components/Header/Header'
import clsx from 'clsx'
import styles from './App.module.css'
import { useThemeStore } from './stores/themeStore'
import ToastContainer from "./components/ToastContainer/ToastContainer.tsx";

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme]) // ← Зависит от theme — перерисовывает стили при изменении

  return (
    <Router>
      <Header />
      <main className={clsx('container', styles.main)}>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/products" element={<CatalogPage />} />
          {/* <Route path="/products/:id" element={<ProductPage />} /> */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  )
}

export default App
