import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  css: {
    modules: {
      localsConvention: (originalClassName: string) => originalClassName,
    },
  },
  test: {
    globals: true,   //`test`, `expect` без импорта
    environment: 'jsdom',    // Эмуляция браузера
    // setupFiles: './src/setupTests.ts',  глобальные настройки
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    }
})
