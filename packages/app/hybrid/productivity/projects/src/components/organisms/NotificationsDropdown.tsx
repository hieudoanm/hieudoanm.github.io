'use client';

import { type FC, useMemo, useState } from 'react';
import { FiBell, FiCheck, FiClock, FiUserPlus, FiAtSign } from 'react-icons/fi';
import { useData } from '@/providers/DataProvider';
import { formatRelativeTime } from '@/utils/format';
import { CURRENT_USER_ID, mentionPattern } from '@/utils/collab';

interface NotificationItem {
  id: string;
  kind: 'due' | 'mention' | 'assigned';
  text: string;
  timestamp: number;
}

interface NotificationsDropdownProps {
  boardId: string;
}

const NotificationsDropdown: FC<NotificationsDropdownProps> = ({ boardId }) => {
  const { cards, members, settings, updateSettings } = useData();
  const [open, setOpen] = useState(false);

  const boardCards = useMemo(() => cards.filter((c) => !c.archived), [cards]);

  const notifications = useMemo(() => {
    const due: NotificationItem[] = [];
    const mentions: NotificationItem[] = [];
    const assigned: NotificationItem[] = [];
    const mentionRe = new RegExp(mentionPattern(members), 'g');

    for (const card of boardCards) {
      if (card.memberIds.includes(CURRENT_USER_ID)) {
        if (card.dueDate && card.dueDate <= Date.now() + 86400000) {
          due.push({
            id: `due-${card.id}`,
            kind: 'due',
            text: `"${card.title}" is ${
              card.dueDate < Date.now() ? 'overdue' : 'due'
            }`,
            timestamp: card.dueDate,
          });
        }
        if (card.createdAt > Date.now() - 86400000) {
          assigned.push({
            id: `assigned-${card.id}`,
            kind: 'assigned',
            text: `You were assigned to "${card.title}"`,
            timestamp: card.createdAt,
          });
        }
      }
      for (const comment of card.comments) {
        mentionRe.lastIndex = 0;
        if (mentionRe.test(comment.text)) {
          mentions.push({
            id: `mention-${comment.id}`,
            kind: 'mention',
            text: `${comment.author} mentioned you on "${card.title}"`,
            timestamp: comment.createdAt,
          });
        }
      }
    }

    return [...due, ...mentions, ...assigned].sort(
      (a, b) => b.timestamp - a.timestamp
    );
  }, [boardCards, members]);

  const unread = notifications.filter(
    (n) => n.timestamp > (settings.notificationsReadAt ?? 0)
  ).length;

  const kindIcon = (kind: NotificationItem['kind']) => {
    if (kind === 'due') return <FiClock className="text-warning size-3" />;
    if (kind === 'mention') return <FiAtSign className="text-primary size-3" />;
    return <FiUserPlus className="text-success size-3" />;
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Notifications"
        onClick={() => setOpen((o) => !o)}
        className="btn btn-ghost btn-sm btn-circle relative">
        <FiBell className="size-5" />
        {unread > 0 && (
          <span className="badge badge-error badge-xs absolute -top-0.5 -right-0.5">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="bg-base-100 absolute top-10 right-0 z-40 w-72 rounded-lg border p-2 shadow-lg">
          <div className="flex items-center justify-between px-2 py-1">
            <p className="text-xs font-bold">Notifications</p>
            <button
              type="button"
              onClick={() =>
                updateSettings({ notificationsReadAt: Date.now() })
              }
              className="btn btn-ghost btn-xs">
              <FiCheck className="size-3" /> Mark all read
            </button>
          </div>
          <div className="max-h-72 space-y-1 overflow-auto">
            {notifications.length === 0 && (
              <p className="px-2 py-6 text-center text-xs opacity-50">
                No notifications
              </p>
            )}
            {notifications.map((n) => {
              const isRead = n.timestamp <= (settings.notificationsReadAt ?? 0);
              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-2 rounded p-2 text-xs ${
                    isRead ? 'opacity-50' : 'bg-base-200'
                  }`}>
                  <span className="mt-0.5">{kindIcon(n.kind)}</span>
                  <div className="min-w-0">
                    <p className="leading-snug">{n.text}</p>
                    <p className="mt-0.5 text-[10px] opacity-40">
                      {formatRelativeTime(n.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
