'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { formatRelativeTime } from '@/utils/format';
import { useToast } from '@/providers/ToastProvider';
import { FiPlus, FiStar, FiTrash2, FiLayout } from 'react-icons/fi';

const HomeContent: FC = () => {
  const {
    boards,
    lists,
    cards,
    isLoading,
    createBoard,
    deleteBoard,
    toggleStarBoard,
  } = useData();
  const { addToast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBg, setNewBg] = useState('#3b82f6');

  const colors = [
    '#3b82f6',
    '#22c55e',
    '#f97316',
    '#8b5cf6',
    '#ec4899',
    '#ef4444',
    '#06b6d4',
    '#eab308',
  ];
  const starred = boards.filter((b) => b.starred);
  const others = boards.filter((b) => !b.starred);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createBoard(newName.trim(), newBg);
    setNewName('');
    setShowCreate(false);
    addToast('Board created', 'success');
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-bold">Projects</h1>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="btn btn-primary btn-sm">
          <FiPlus className="size-4" /> New Board
        </button>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-32 rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {starred.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-3 text-sm font-semibold opacity-70">
                  Starred
                </h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {starred.map((board) => {
                    const boardLists = lists.filter(
                      (l) => l.boardId === board.id
                    );
                    const boardCards = cards.filter((c) =>
                      boardLists.some((l) => l.cardIds.includes(c.id))
                    );
                    return (
                      <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        className="card bg-base-200 overflow-hidden transition-shadow hover:shadow-lg">
                        <div
                          className="h-16 w-full"
                          style={{ backgroundColor: board.background }}
                        />
                        <div className="card-body p-3">
                          <div className="flex items-center gap-2">
                            <h3 className="flex-1 truncate text-sm font-semibold">
                              {board.name}
                            </h3>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleStarBoard(board.id);
                              }}
                              className="btn btn-ghost btn-xs btn-circle">
                              <FiStar className="fill-warning text-warning size-3" />
                            </button>
                          </div>
                          <p className="text-xs opacity-50">
                            {boardLists.length} lists · {boardCards.length}{' '}
                            cards
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
            <section>
              <h2 className="mb-3 text-sm font-semibold opacity-70">
                All Boards
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {others.map((board) => {
                  const boardLists = lists.filter(
                    (l) => l.boardId === board.id
                  );
                  const boardCards = cards.filter((c) =>
                    boardLists.some((l) => l.cardIds.includes(c.id))
                  );
                  return (
                    <Link
                      key={board.id}
                      href={`/board/${board.id}`}
                      className="card bg-base-200 overflow-hidden transition-shadow hover:shadow-lg">
                      <div
                        className="h-16 w-full"
                        style={{ backgroundColor: board.background }}
                      />
                      <div className="card-body p-3">
                        <div className="flex items-center gap-2">
                          <h3 className="flex-1 truncate text-sm font-semibold">
                            {board.name}
                          </h3>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleStarBoard(board.id);
                            }}
                            className="btn btn-ghost btn-xs btn-circle">
                            <FiStar className="size-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteBoard(board.id);
                              addToast('Board deleted', 'info');
                            }}
                            className="btn btn-ghost btn-xs btn-circle text-error">
                            <FiTrash2 className="size-3" />
                          </button>
                        </div>
                        <p className="text-xs opacity-50">
                          {boardLists.length} lists · {boardCards.length} cards
                          · {formatRelativeTime(board.updatedAt)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
                {boards.length === 0 && (
                  <p className="text-base-content/50 col-span-full py-8 text-center">
                    No boards yet. Create one!
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 card w-full max-w-md shadow-xl">
            <div className="card-body">
              <h2 className="card-title">New Board</h2>
              <input
                type="text"
                placeholder="Board name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input input-bordered w-full"
              />
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewBg(c)}
                    className={`h-8 w-8 rounded-full ${newBg === c ? 'ring-primary ring-2 ring-offset-2' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="btn btn-ghost">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreate}
                  className="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage: FC = () => (
  <Providers>
    <HomeContent />
  </Providers>
);
export default HomePage;
