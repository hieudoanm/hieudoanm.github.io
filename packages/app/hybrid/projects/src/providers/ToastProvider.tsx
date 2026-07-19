'use client';

import {
  type FC,
  useState,
  useCallback,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
} from 'react';

export type ToastType = 'success' | 'error' | 'info';
interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}
const ToastContext = createContext<ToastContextType | null>(null);
export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts((p) => [...p, { id, message, type }]);
    useEffect(() => {
      const t = setTimeout(
        () => setToasts((p) => p.filter((x) => x.id !== id)),
        3000
      );
      return () => clearTimeout(t);
    }, [id]);
  }, []);
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast toast-end fixed right-4 bottom-4 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`alert ${t.type === 'success' ? 'alert-success' : t.type === 'error' ? 'alert-error' : 'alert-info'} text-sm`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
