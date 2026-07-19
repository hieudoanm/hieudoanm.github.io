'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

const variantClass: Record<ToastVariant, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

export const Toast: FC<ToastProps> = ({
  message,
  variant = 'info',
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="toast toast-end">
      <div className={`alert ${variantClass[variant]}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};
