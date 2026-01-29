// src/store/toastStore.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastStore {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>()(
  devtools((set, get) => ({
    toasts: [],

    addToast: (message, type = 'success') => {
      const id = Math.random().toString(36).substring(2, 9)
      set((state) => ({
        toasts: [...state.toasts, { id, message, type }],
      }))
      // Автоматическое удаление через 3 секунды
      setTimeout(() => {
        get().removeToast(id)
      }, 3000)
    },

    removeToast: (id) => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }))
    },
  }))
)
