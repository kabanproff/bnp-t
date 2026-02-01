// src/lib/numWord.test.ts
import { describe, it, expect } from '@jest/globals'
import { num_word } from './numWord'

describe('num_word', () => {
  it('returns "товар" for 1', () => {
    expect(num_word(1, ['товар', 'товара', 'товаров'])).toBe('товар')
  })

  it('returns "товара" for 2', () => {
    expect(num_word(2, ['товар', 'товара', 'товаров'])).toBe('товара')
  })

  it('returns "товаров" for 5', () => {
    expect(num_word(5, ['товар', 'товара', 'товаров'])).toBe('товаров')
  })

  it('returns "товар" for 21', () => {
    expect(num_word(21, ['товар', 'товара', 'товаров'])).toBe('товар')
  })

  it('returns "товаров" for 11', () => {
    expect(num_word(11, ['товар', 'товара', 'товаров'])).toBe('товаров')
  })

  it('returns "товарa" for 102', () => {
    expect(num_word(102, ['товар', 'товара', 'товаров'])).toBe('товара')
  })
})
