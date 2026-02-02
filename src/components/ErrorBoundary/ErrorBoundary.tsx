// components/ErrorBoundary.tsx — улучшенная версия с retry
import React from 'react';
import styles from './ErrorBoundary.module.scss'

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  retry = () => {
    this.setState({hasError: false, error: null});
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles["error-boundary"]}>

          <div className={styles["error-boundary__box"]}>
            <h3>⚠️ Что-то пошло не так</h3>
            <p>{this.state.error?.message}</p>
            <button
              onClick={this.retry}
              className={styles["error-boundary__btn"]}
            >
              Попробовать снова
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
