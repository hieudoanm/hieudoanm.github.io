'use client';

import { type FC, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { formatDate } from '@/utils/format';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import type { Card } from '@/types';

const ListViewContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const boardId = params?.id as string;
  const { boards, lists, cards, labels, members, isLoading } = useData();
  const board = boards.find((b) => b.id === boardId);
  const boardLists = board
    ? board.listIds.map((id) => lists.find((l) => l.id === id)).filter(Boolean)
    : [];
  const allCards = boardLists.flatMap((list) =>
    (list?.cardIds ?? [])
      .map((cid) => cards.find((c) => c.id === cid))
      .filter(Boolean)
  ) as Card[];

  useEffect(() => {
    if (!board && !isLoading && boards.length > 0) router.push('/');
  }, [board, isLoading, boards, router]);

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push(`/board/${boardId}`)}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 text-lg font-bold">{board?.name} — List View</h1>
        <Link href={`/board/${boardId}`} className="btn btn-ghost btn-sm">
          Kanban
        </Link>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        <div className="overflow-x-auto">
          <table className="table-zebra table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>List</th>
                <th>Labels</th>
                <th>Assignees</th>
                <th>Due</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {allCards.map((card) => {
                const list = boardLists.find((l) =>
                  l?.cardIds.includes(card.id)
                );
                return (
                  <tr key={card.id}>
                    <td className="font-medium">{card.title}</td>
                    <td className="text-sm opacity-70">{list?.name}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {card.labels.map((lid) => {
                          const lbl = labels.find((l) => l.id === lid);
                          return lbl ? (
                            <span
                              key={lid}
                              className="badge badge-xs"
                              style={{
                                backgroundColor: lbl.color,
                                color: 'white',
                              }}>
                              {lbl.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </td>
                    <td>
                      <div className="flex -space-x-1">
                        {card.memberIds.map((mid) => {
                          const m = members.find((x) => x.id === mid);
                          return m ? (
                            <div
                              key={mid}
                              className="bg-base-300 flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold">
                              {m.avatar}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </td>
                    <td className="text-sm">
                      {card.dueDate ? formatDate(card.dueDate) : '—'}
                    </td>
                    <td>
                      <span
                        className={`badge badge-xs ${card.priority === 'urgent' || card.priority === 'high' ? 'badge-error' : card.priority === 'low' ? 'badge-success' : 'badge-warning'}`}>
                        {card.priority}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const ListPage: FC = () => (
  <Providers>
    <ListViewContent />
  </Providers>
);
export default ListPage;
