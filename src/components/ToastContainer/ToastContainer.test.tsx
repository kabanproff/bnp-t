// src/components/ui/ToastContainer.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ToastContainer from './ToastContainer'
import { useToastStore } from '../../stores/toastStore'
import {MockedFunction} from 'jest-mock';

type ToastStore = ReturnType<typeof useToastStore>

const mockAddToast = jest.fn()
const mockRemoveToast = jest.fn()

const mockStore: ToastStore = {
  toasts: [],
  addToast: mockAddToast,
  removeToast: mockRemoveToast,
}

jest.mock('../../stores/toastStore', () => ({
  useToastStore: jest.fn(() => mockStore),
}))

const mockedUseToastStore = useToastStore as MockedFunction<typeof useToastStore>
describe('ToastContainer', () => {
  beforeEach(() => {
    mockedUseToastStore.mockReturnValue({
      toasts: [
        { id: '1', message: 'Test', type: 'success' },
      ],
      addToast: mockAddToast,
      removeToast: mockRemoveToast,
    })
  })

  it('renders toast message', () => {
    render(<ToastContainer />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('does not render if no toasts', () => {
    mockedUseToastStore.mockReturnValue({
      toasts: [],
      addToast: mockAddToast,
      removeToast: mockRemoveToast,
    })
    render(<ToastContainer />)
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
  })
})
