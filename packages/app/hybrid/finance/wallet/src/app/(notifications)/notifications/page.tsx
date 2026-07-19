'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { NotificationItem } from '@/components/atoms';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';

type Filter = 'all' | 'unread' | 'alerts';

const NotificationsPage = () => {
  const { notifications, markNotificationRead, loading } = useData();
  const [filter, setFilter] = useState<Filter>('all');

  console.log('[NotificationsPage] render', {
    loading,
    count: notifications.length,
  });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-2/5" />
            <SkeletonText className="w-1/4" />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="rounded-btn h-8 w-20" />
            ))}
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
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
              <NotificationItem
                key={n.id}
                notification={n}
                onRead={markNotificationRead}
              />
            ))
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default NotificationsPage;
