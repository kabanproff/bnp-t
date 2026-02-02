import { describe, it, expect, beforeEach } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import CartIndicator from './CartIndicator'
import { num_word } from '../../utils/numWord'

// Мокируем num_word
jest.mock('../../utils/numWord', () => ({
  num_word: jest.fn(),
}))

describe('CartIndicator', () => {
  beforeEach(() => {
    (num_word as jest.Mock).mockClear()
  })

  it('should not render when totalItems is 0', () => {
    render(<CartIndicator totalItems={0} />)
    expect(screen.queryByTestId('cart-indicator')).not.toBeInTheDocument()
  })

  it('should render with correct number and singular form for 1', () => {
    (num_word as jest.Mock).mockReturnValue('товар')
    render(<CartIndicator totalItems={1} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 1 товар')
    expect(num_word).toHaveBeenCalledWith(1, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and plural form for 2', () => {
    (num_word as jest.Mock).mockReturnValue('товара')
    render(<CartIndicator totalItems={2} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 2 товара')
    expect(num_word).toHaveBeenCalledWith(2, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and plural form for 5', () => {
    (num_word as jest.Mock).mockReturnValue('товаров')
    render(<CartIndicator totalItems={5} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 5 товаров')
    expect(num_word).toHaveBeenCalledWith(5, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and singular form for 21', () => {
    (num_word as jest.Mock).mockReturnValue('товар')
    render(<CartIndicator totalItems={21} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 21 товар')
    expect(num_word).toHaveBeenCalledWith(21, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and plural form for 11', () => {
    (num_word as jest.Mock).mockReturnValue('товаров')
    render(<CartIndicator totalItems={11} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 11 товаров')
    expect(num_word).toHaveBeenCalledWith(11, ['товар', 'товара', 'товаров'])
  })

  it('should render with correct number and plural form for 102', () => {
    (num_word as jest.Mock).mockReturnValue('товаров')
    render(<CartIndicator totalItems={102} />)

    const cartIndicator = screen.getByTestId('cart-indicator')
    expect(cartIndicator).toHaveTextContent('🛒 102 товаров')
    expect(num_word).toHaveBeenCalledWith(102, ['товар', 'товара', 'товаров'])
  })
})
