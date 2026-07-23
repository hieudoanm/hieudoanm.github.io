'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { NotificationItem } from '@/components/atoms';
import { useData } from '@/providers/DataProvider';

type Filter = 'all' | 'unread' | 'alerts';

export default function NotificationsPage() {
  const { notifications, loading } = useData();
  const [filter, setFilter] = useState<Filter>('all');

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </DashboardTemplate>
    );
  }

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'alerts') return n.type === 'alert';
    return true;
  });

  const filters: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Unread', value: 'unread' },
    { label: 'Alerts', value: 'alerts' },
  ];

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-base-content/60">Stay updated</p>
        </div>

        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`btn btn-sm ${filter === f.value ? 'btn-primary' : ''}`}
              onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <p className="text-base-content/60 py-8 text-center">
              No notifications found
            </p>
          ) : (
            filtered.map((n) => (
              <NotificationItem key={n.id} notification={n} />
            ))
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
}
