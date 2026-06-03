import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export enum NotificationType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  dismissible: boolean;
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (
    type: NotificationType,
    message: string,
    options?: {
      title?: string;
      dismissible?: boolean;
      timeout?: number;
    }
  ) => string;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const ref = timeoutRefs.current[id];
    if (ref) {
      clearTimeout(ref);
      delete timeoutRefs.current[id];
    }
  };

  const addNotification = (
    type: NotificationType,
    message: string,
    options?: {
      title?: string;
      dismissible?: boolean;
      timeout?: number;
    }
  ): string => {
    const id = crypto.randomUUID();
    const { title, dismissible = true, timeout = 3000 } = options ?? {};

    const notification: Notification = {
      id,
      type,
      message,
      title,
      dismissible,
    };

    setNotifications((prev) => {
      const exists = prev.some((n) => n.message === message && n.type === type);
      return exists ? prev : [...prev, notification];
    });

    timeoutRefs.current[id] = setTimeout(() => {
      removeNotification(id);
    }, timeout);

    return id;
  };

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  return context;
};
