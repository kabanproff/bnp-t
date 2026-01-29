import { renderHook, act } from '@testing-library/react'
import { useToastStore } from './toastStore'

describe('useToastStore', () => {
  beforeEach(() => {
    // Очищаем состояние перед каждым тестом
    const state = useToastStore.getState()
    state.toasts = [] // Безопасно: Zustand синглтон, и мы мутируем его напрямую
  })

  it('should add a toast when addToast is called', () => {
    const { result } = renderHook(() => useToastStore())

    // ✅ ОБЕРНУЛИ В act() — ВАЖНО!
    act(() => {
      result.current.addToast('Test message', 'success')
    })

    // Проверяем результат — теперь стейт гарантированно обновлён
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('Test message')
    expect(result.current.toasts[0].type).toBe('success')
  })

  it('should remove a toast when removeToast is called', () => {
    const { result } = renderHook(() => useToastStore())

    // ✅ Оборачиваем ВСЕ изменения в act()
    act(() => {
      result.current.addToast('Test 1', 'success')
      result.current.addToast('Test 2', 'error')
    })

    expect(result.current.toasts).toHaveLength(2)

    const id = result.current.toasts[0].id

    // ✅ Оборачиваем удаление в act()
    act(() => {
      result.current.removeToast(id)
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].message).toBe('Test 2')
  })
})
