'use client';

import { METHOD_COLORS } from '@/lib/format';
import { RequestConfig, RequestTab } from '@/types/api-client';
import { type FC } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

interface RequestTabBarProps {
  tabs: RequestTab[];
  activeId: string;
  onActivate: (id: string) => void;
  onClose: (id: string) => void;
  onAdd: () => void;
}

const tabLabel = (request: RequestConfig): string => {
  if (request.url.trim() === '') return 'New Request';
  const path = request.url.split(/[?#]/)[0].replace(/^[a-z]+:\/\/[^/]+/i, '');
  return path === '' ? '/' : path;
};

export const RequestTabBar: FC<RequestTabBarProps> = ({
  tabs,
  activeId,
  onActivate,
  onClose,
  onAdd,
}) => (
  <div className="flex flex-wrap items-center gap-1">
    {tabs.map((tab) => (
      <span
        key={tab.id}
        className={`group inline-flex items-center gap-1.5 rounded-lg border p-1 pl-2 text-xs ${
          activeId === tab.id
            ? 'border-base-content/30 bg-base-200'
            : 'border-base-300 bg-transparent'
        }`}>
        <button
          type="button"
          onClick={() => onActivate(tab.id)}
          className="inline-flex items-center gap-1.5 font-mono">
          <span
            className={`badge ${METHOD_COLORS[tab.request.method]} badge-xs`}>
            {tab.request.method}
          </span>
          <span className="max-w-40 truncate">{tabLabel(tab.request)}</span>
        </button>
        {tabs.length > 1 && (
          <button
            type="button"
            onClick={() => onClose(tab.id)}
            aria-label={`Close tab ${tabLabel(tab.request)}`}
            className="btn btn-ghost btn-xs size-5 min-h-0 p-0 opacity-50 group-hover:opacity-100">
            <FiX className="size-3" />
          </button>
        )}
      </span>
    ))}
    <button
      type="button"
      onClick={onAdd}
      aria-label="New tab"
      className="btn btn-ghost btn-xs gap-1">
      <FiPlus className="size-4" />
      <span>New tab</span>
    </button>
  </div>
);

RequestTabBar.displayName = 'RequestTabBar';
