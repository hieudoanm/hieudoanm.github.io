'use client';

import { type FC } from 'react';
import { FiDownload, FiX } from 'react-icons/fi';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatDate, formatRelativeTime } from '@/utils/format';

interface BoardActivityProps {
  boardId: string;
  onClose: () => void;
}

const BoardActivity: FC<BoardActivityProps> = ({ boardId, onClose }) => {
  const { activity, members } = useData();
  const { addToast } = useToast();
  const items = activity.filter((a) => a.boardId === boardId);

  const memberAvatar = (userId: string): string =>
    members.find((m) => m.id === userId)?.avatar ?? '?';

  const handleExport = () => {
    const rows = [
      ['Time', 'Member', 'Action'],
      ...items.map((a) => [
        formatDate(a.timestamp),
        members.find((m) => m.id === a.userId)?.name ?? a.userId,
        a.message,
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `board-activity-${boardId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Activity exported', 'success');
  };

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        aria-label="Close activity"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/40"
      />
      <aside className="bg-base-100 absolute inset-y-0 right-0 flex w-80 flex-col border-l shadow-xl">
        <div className="flex items-center justify-between border-b p-3">
          <h2 className="text-sm font-bold">Activity</h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleExport}
              disabled={items.length === 0}
              className="btn btn-ghost btn-xs">
              <FiDownload className="size-3" /> Export
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-xs btn-circle">
              <FiX className="size-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-auto p-3">
          {items.length === 0 && (
            <p className="py-8 text-center text-sm opacity-50">
              No activity yet
            </p>
          )}
          {items.map((a) => (
            <div key={a.id} className="flex items-start gap-2 text-xs">
              <div className="bg-base-300 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-bold">
                {memberAvatar(a.userId)}
              </div>
              <div className="min-w-0">
                <p className="leading-snug">{a.message}</p>
                <p className="mt-0.5 text-[10px] opacity-40">
                  {formatRelativeTime(a.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default BoardActivity;
