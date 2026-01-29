import styles from './Toast.module.scss'

interface ToastProps {
  toast: {
    id: string
    message: string
    type: 'success' | 'error' | 'info'
  }
  onClose: (id: string) => void
}

const Toast = ({toast, onClose}: ToastProps) => {
  const getToastClass = () => {
    switch (toast.type) {
      case 'success':
        return styles.success
      case 'error':
        return styles.error
      case 'info':
        return styles.info
      default:
        return styles.success
    }
  }

  return (
    <div className={`${styles.toast} ${getToastClass()}`}>
      <span className={styles.message}>{toast.message}</span>
      <button
        className={styles.closeButton}
        onClick={() => onClose(toast.id)}
        aria-label="Закрыть уведомление"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
