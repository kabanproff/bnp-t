import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CartIndicator from './CartIndicator'
import { num_word } from '../../lib/numWord'

// Мокируем num_word
vi.mock('../../lib/numWord', () => ({
  num_word: vi.fn(),
}))

describe('CartIndicator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not render when totalItems is 0', () => {
    render(<CartIndicator totalItems={0} />)
    expect(screen.queryByTestId('cart-indicator')).not.toBeInTheDocument()
  })

  it('should render with correct number and singular form for 1', () => {
    vi.mocked(num_word).mockReturnValue('товар')
    render(<CartIndicator totalItems={1} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 1 товар')
    expect(num_word).toHaveBeenCalledWith(1, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and plural form for 2', () => {
    vi.mocked(num_word).mockReturnValue('товара')
    render(<CartIndicator totalItems={2} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 2 товара')
    expect(num_word).toHaveBeenCalledWith(2, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and plural form for 5', () => {
    vi.mocked(num_word).mockReturnValue('товаров')
    render(<CartIndicator totalItems={5} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 5 товаров')
    expect(num_word).toHaveBeenCalledWith(5, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and singular form for 21', () => {
    vi.mocked(num_word).mockReturnValue('товар')
    render(<CartIndicator totalItems={21} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 21 товар')
    expect(num_word).toHaveBeenCalledWith(21, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and plural form for 11', () => {
    vi.mocked(num_word).mockReturnValue('товаров')
    render(<CartIndicator totalItems={11} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 11 товаров')
    expect(num_word).toHaveBeenCalledWith(11, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and plural form for 102', () => {
    vi.mocked(num_word).mockReturnValue('товаров') // ✅ ИСПРАВЛЕНО: 102 → "товаров", а не "товара"
    render(<CartIndicator totalItems={102} />)
    // console.log(render(<CartIndicator totalItems={102} />))
    const cartIndicator = screen.getByTestId('cart-indicator')
    // console.log(render(<CartIndicator totalItems={102}/>))
    expect(cartIndicator).toHaveTextContent('🛒 102 товаров')
    expect(num_word).toHaveBeenCalledWith(102, ['товар', 'товара', 'товаров'])
  })
})
