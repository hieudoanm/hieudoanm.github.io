'use client';

import { type FC, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { formatDate } from '@/utils/format';
import { FiArrowLeft } from 'react-icons/fi';
import type { Card } from '@/types';

const TimelineContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const boardId = params?.id as string;
  const { boards, cards, isLoading } = useData();
  const board = boards.find((b) => b.id === boardId);
  const datedCards = cards
    .filter((c) => !c.archived && c.dueDate)
    .sort((a, b) => a.dueDate! - b.dueDate!);

  useEffect(() => {
    if (!board && !isLoading && boards.length > 0) router.push('/');
  }, [board, isLoading, boards, router]);

  const minDate = datedCards.length > 0 ? datedCards[0].dueDate! : Date.now();
  const maxDate =
    datedCards.length > 0
      ? datedCards[datedCards.length - 1].dueDate!
      : Date.now() + 86400000 * 30;
  const totalDays = Math.max(1, Math.ceil((maxDate - minDate) / 86400000));

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push(`/board/${boardId}`)}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 text-lg font-bold">{board?.name} — Timeline</h1>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        {datedCards.length === 0 ? (
          <p className="text-base-content/50 py-8 text-center">
            No cards with due dates
          </p>
        ) : (
          <div className="space-y-2">
            {datedCards.map((card) => {
              const offset = Math.max(
                0,
                Math.ceil((card.dueDate! - minDate) / 86400000)
              );
              const pct = (offset / totalDays) * 100;
              return (
                <div key={card.id} className="flex items-center gap-3">
                  <span className="w-48 truncate text-xs font-medium">
                    {card.title}
                  </span>
                  <div className="bg-base-200 relative h-6 flex-1 rounded">
                    <div
                      className="absolute top-0 left-0 h-full rounded"
                      style={{
                        left: `${pct}%`,
                        width: '60px',
                        backgroundColor: card.coverColor ?? '#3b82f6',
                      }}>
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] text-white drop-shadow">
                        {formatDate(card.dueDate!)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

const TimelinePage: FC = () => (
  <Providers>
    <TimelineContent />
  </Providers>
);
export default TimelinePage;
