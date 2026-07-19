'use client';

import { type FC, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { formatDate } from '@/utils/format';
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Card } from '@/types';

const CalendarContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const boardId = params?.id as string;
  const { boards, lists, cards, isLoading } = useData();
  const board = boards.find((b) => b.id === boardId);
  const allCards = cards.filter((c) => !c.archived && c.dueDate);
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    if (!board && !isLoading && boards.length > 0) router.push('/');
  }, [board, isLoading, boards, router]);

  const year = month.getFullYear();
  const m = month.getMonth();
  const firstDay = new Date(year, m, 1).getDay();
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const getCardsForDay = (day: number): Card[] => {
    const date = new Date(year, m, day).getTime();
    const next = new Date(year, m, day + 1).getTime();
    return allCards.filter((c) => c.dueDate! >= date && c.dueDate! < next);
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push(`/board/${boardId}`)}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 text-lg font-bold">{board?.name} — Calendar</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMonth(new Date(year, m - 1))}
            className="btn btn-ghost btn-sm btn-circle">
            <FiChevronLeft className="size-4" />
          </button>
          <span className="text-sm font-medium">
            {month.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            type="button"
            onClick={() => setMonth(new Date(year, m + 1))}
            className="btn btn-ghost btn-sm btn-circle">
            <FiChevronRight className="size-4" />
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        <div className="bg-base-300 grid grid-cols-7 gap-px overflow-hidden rounded-lg">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div
              key={d}
              className="bg-base-200 p-2 text-center text-xs font-semibold">
              {d}
            </div>
          ))}
          {days.map((day, i) => {
            const dayCards = day ? getCardsForDay(day) : [];
            const isToday =
              day === new Date().getDate() &&
              m === new Date().getMonth() &&
              year === new Date().getFullYear();
            return (
              <div
                key={i}
                className={`bg-base-100 min-h-[80px] p-1 ${isToday ? 'bg-primary/10' : ''}`}>
                {day && (
                  <span
                    className={`text-xs ${isToday ? 'text-primary font-bold' : 'opacity-50'}`}>
                    {day}
                  </span>
                )}
                {dayCards.map((card) => (
                  <div
                    key={card.id}
                    className="mt-0.5 truncate rounded px-1 py-0.5 text-[10px]"
                    style={{
                      backgroundColor: card.coverColor ?? '#374151',
                      color: 'white',
                    }}>
                    {card.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

const CalendarPage: FC = () => (
  <Providers>
    <CalendarContent />
  </Providers>
);
export default CalendarPage;
