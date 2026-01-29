// src/components/ui/ToastContainer.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ToastContainer from './ToastContainer'
import { useToastStore } from '../../stores/toastStore'

// Мокаем стор в тесте
jest.mock('../../stores/toastStore', () => ({
  useToastStore: jest.fn(),
}))

describe('ToastContainer', () => {
  beforeEach(() => {
    // Мокаем состояние стора
    ;(useToastStore as any).mockReturnValue({
      toasts: [
        { id: '1', message: 'Test', type: 'success' },
      ],
      removeToast: jest.fn(),
    })
  })

  it('renders toast message', () => {
    render(<ToastContainer />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('does not render if no toasts', () => {
    ;(useToastStore as any).mockReturnValue({
      toasts: [],
      removeToast: jest.fn(),
    })
    render(<ToastContainer />)
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
  })
})
