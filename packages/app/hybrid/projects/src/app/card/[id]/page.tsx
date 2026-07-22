'use client';

import { type FC, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatDate, formatRelativeTime } from '@/utils/format';
import {
  FiArrowLeft,
  FiX,
  FiCheck,
  FiCalendar,
  FiTrash2,
} from 'react-icons/fi';
import type { Card } from '@/types';

const CardDetailContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const cardId = params?.id as string;
  const {
    cards,
    lists,
    labels,
    members,
    updateCard,
    deleteCard,
    toggleChecklistItem,
    addChecklistItem,
    isLoading,
  } = useData();
  const { addToast } = useToast();
  const card = cards.find((c) => c.id === cardId);
  const list = card ? lists.find((l) => l.id === card.listId) : null;
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (!card && !isLoading && cards.length > 0) router.push('/');
  }, [card, isLoading, cards, router]);

  if (!card)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-base-content/50">Loading...</p>
      </div>
    );

  const checkedCount = card.checklistItems.filter((i) => i.checked).length;
  const progress =
    card.checklistItems.length > 0
      ? (checkedCount / card.checklistItems.length) * 100
      : 0;

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 text-lg font-bold">{card.title}</h1>
        <button
          type="button"
          onClick={() => {
            deleteCard(card.id);
            addToast('Card deleted', 'info');
            router.back();
          }}
          className="btn btn-ghost btn-sm text-error">
          <FiTrash2 className="size-4" /> Delete
        </button>
      </header>
      <main className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="card bg-base-200 card-body">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={card.description}
            onChange={(e) =>
              updateCard(card.id, { description: e.target.value })
            }
            placeholder="Add a description..."
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>

        <div className="card bg-base-200 card-body">
          <h3 className="card-title text-sm">Details</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="opacity-50">List:</span> {list?.name}
            </div>
            <div>
              <span className="opacity-50">Priority:</span>{' '}
              <span
                className={`badge badge-xs ${card.priority === 'urgent' || card.priority === 'high' ? 'badge-error' : card.priority === 'low' ? 'badge-success' : 'badge-warning'}`}>
                {card.priority}
              </span>
            </div>
            <div>
              <span className="opacity-50">Due:</span>{' '}
              {card.dueDate ? formatDate(card.dueDate) : 'None'}
            </div>
            <div>
              <span className="opacity-50">Created:</span>{' '}
              {formatRelativeTime(card.createdAt)}
            </div>
          </div>
        </div>

        <div className="card bg-base-200 card-body">
          <h3 className="card-title text-sm">Labels</h3>
          <div className="flex flex-wrap gap-2">
            {labels.map((lbl) => (
              <button
                key={lbl.id}
                type="button"
                onClick={() => {
                  const newLabels = card.labels.includes(lbl.id)
                    ? card.labels.filter((l) => l !== lbl.id)
                    : [...card.labels, lbl.id];
                  updateCard(card.id, { labels: newLabels });
                }}
                className={`badge cursor-pointer ${card.labels.includes(lbl.id) ? 'opacity-100' : 'opacity-30'}`}
                style={{ backgroundColor: lbl.color, color: 'white' }}>
                {lbl.name}
              </button>
            ))}
          </div>
        </div>

        <div className="card bg-base-200 card-body">
          <h3 className="card-title text-sm">Members</h3>
          <div className="flex flex-wrap gap-2">
            {members.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  const newMembers = card.memberIds.includes(m.id)
                    ? card.memberIds.filter((x) => x !== m.id)
                    : [...card.memberIds, m.id];
                  updateCard(card.id, { memberIds: newMembers });
                }}
                className={`avatar placeholder cursor-pointer ${card.memberIds.includes(m.id) ? 'ring-primary opacity-100 ring-2' : 'opacity-30'}`}>
                <div className="bg-base-300 w-8 rounded-full">
                  <span className="text-xs">{m.avatar}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card bg-base-200 card-body">
          <h3 className="card-title text-sm">Checklist</h3>
          {card.checklistItems.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-2 text-xs">
                <span>
                  {checkedCount}/{card.checklistItems.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value={checkedCount}
                max={card.checklistItems.length}
              />
            </div>
          )}
          {card.checklistItems.map((item) => (
            <label
              key={item.id}
              className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={item.checked}
                onChange={() => toggleChecklistItem(card.id, item.id)}
              />
              <span
                className={`text-sm ${item.checked ? 'line-through opacity-50' : ''}`}>
                {item.text}
              </span>
            </label>
          ))}
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newItem.trim()) {
                  addChecklistItem(card.id, newItem.trim());
                  setNewItem('');
                }
              }}
              placeholder="Add item"
              className="input input-sm flex-1"
            />
            <button
              type="button"
              onClick={() => {
                if (newItem.trim()) {
                  addChecklistItem(card.id, newItem.trim());
                  setNewItem('');
                }
              }}
              className="btn btn-primary btn-sm">
              <FiCheck className="size-3" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const CardDetailPage: FC = () => (
  <Providers>
    <CardDetailContent />
  </Providers>
);
export default CardDetailPage;
