'use client';

import { DashboardTemplate } from '@/components/templates';
import { NotificationItem } from '@/components/atoms';
import { notifications } from '@/data/mock';

export default function NotificationsPage() {
  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-base-content/60">Stay updated</p>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm">All</button>
          <button className="btn btn-outline btn-sm">Unread</button>
          <button className="btn btn-outline btn-sm">Alerts</button>
        </div>

        <div className="flex flex-col gap-2">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      </div>
    </DashboardTemplate>
  );
}
