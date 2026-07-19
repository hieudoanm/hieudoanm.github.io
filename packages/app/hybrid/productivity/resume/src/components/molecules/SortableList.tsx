'use client';

import { useState } from 'react';
import type { FC, ReactElement, ReactNode } from 'react';
import { LuGripVertical } from 'react-icons/lu';

const DATA_MIME = 'text/plain';

interface SortableListProps<T> {
  items: T[];
  getKey: (item: T) => string;
  onReorder: (items: T[]) => void;
  renderItem: (item: T) => ReactNode;
}

export const SortableList = <T,>({
  items,
  getKey,
  onReorder,
  renderItem,
}: SortableListProps<T>): ReactElement => {
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [overKey, setOverKey] = useState<string | null>(null);

  const move = (fromKey: string, toKey: string) => {
    const from = items.findIndex((item) => getKey(item) === fromKey);
    const to = items.findIndex((item) => getKey(item) === toKey);
    if (from < 0 || to < 0 || from === to) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onReorder(next);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const key = getKey(item);
        const isDragging = key === dragKey;
        const isOver = key === overKey && !isDragging;
        return (
          <div
            key={key}
            className={[
              'flex items-start gap-1',
              isOver ? 'ring-primary/60 rounded-xl ring-2' : '',
            ].join(' ')}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = 'move';
              setOverKey(key);
            }}
            onDragLeave={() =>
              setOverKey((current) => (current === key ? null : current))
            }
            onDrop={(event) => {
              event.preventDefault();
              move(event.dataTransfer.getData(DATA_MIME), key);
              setDragKey(null);
              setOverKey(null);
            }}>
            <button
              type="button"
              draggable
              className="btn btn-ghost btn-xs mt-2 cursor-grab select-none active:cursor-grabbing"
              aria-label="Drag to reorder"
              aria-grabbed={isDragging}
              onDragStart={(event) => {
                setDragKey(key);
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData(DATA_MIME, key);
              }}
              onDragEnd={() => {
                setDragKey(null);
                setOverKey(null);
              }}>
              <LuGripVertical />
            </button>
            <div
              className={
                isDragging ? 'min-w-0 flex-1 opacity-50' : 'min-w-0 flex-1'
              }>
              {renderItem(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

SortableList.displayName = 'SortableList';
