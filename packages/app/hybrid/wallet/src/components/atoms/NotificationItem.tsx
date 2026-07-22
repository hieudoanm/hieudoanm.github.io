import { FC } from 'react';
import type { Notification } from '@/types';
import { formatRelativeDate } from '@/utils/format';
import {
  FiSend,
  FiAlertTriangle,
  FiGift,
  FiSettings,
  FiBell,
} from 'react-icons/fi';

interface NotificationItemProps {
  notification: Notification;
}

const typeIcon = (type: string) => {
  switch (type) {
    case 'transaction':
      return <FiSend />;
    case 'alert':
      return <FiAlertTriangle />;
    case 'promotion':
      return <FiGift />;
    case 'system':
      return <FiSettings />;
    default:
      return <FiBell />;
  }
};

const typeColor = (type: string) => {
  switch (type) {
    case 'alert':
      return 'alert alert-warning';
    case 'transaction':
      return 'alert alert-info';
    default:
      return '';
  }
};

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  return (
    <div
      className={`bg-base-200 flex items-start gap-3 rounded-xl p-4 ${
        !notification.read ? 'ring-primary ring-1' : ''
      } ${typeColor(notification.type)}`}>
      <span className="text-2xl">{typeIcon(notification.type)}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{notification.title}</p>
          {!notification.read && (
            <span className="badge badge-primary badge-sm">New</span>
          )}
        </div>
        <p className="text-base-content/60 text-sm">{notification.message}</p>
        <p className="text-base-content/60 mt-1 text-xs">
          {formatRelativeDate(notification.date)}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
