import Toast from '../Toast/Toast';
import {useToastStore} from '../../stores/toastStore';
import styles from "./ToastContainer.module.scss";

const ToastContainer = () => {
  const {toasts, removeToast} = useToastStore()
  if (toasts.length === 0) return null
  return (
    <div className={styles["toast-container"]}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={removeToast}/>
      ))}
    </div>
  )
}

export default ToastContainer
