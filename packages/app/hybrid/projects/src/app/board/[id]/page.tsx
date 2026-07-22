'use client';

import { type FC, useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatRelativeTime, formatDate } from '@/utils/format';
import {
  FiArrowLeft,
  FiPlus,
  FiMoreHorizontal,
  FiStar,
  FiX,
  FiCheck,
  FiCalendar,
  FiTag,
  FiUser,
  FiTrash2,
  FiChevronDown,
  FiChevronRight,
} from 'react-icons/fi';
import type { Card as CardType, List as ListType } from '@/types';

const priorityColors: Record<string, string> = {
  low: 'badge-success',
  medium: 'badge-warning',
  high: 'badge-error',
  urgent: 'badge-error',
};

const BoardContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const boardId = params?.id as string;
  const {
    boards,
    lists,
    cards,
    labels,
    members,
    createList,
    updateList,
    createCard,
    moveCard,
    deleteCard,
    updateCard,
    toggleChecklistItem,
    addChecklistItem,
    toggleStarBoard,
    addActivity,
    isLoading,
  } = useData();
  const { addToast } = useToast();
  const [newListName, setNewListName] = useState('');
  const [showNewList, setShowNewList] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [addingToList, setAddingToList] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [dragCardId, setDragCardId] = useState<string | null>(null);
  const [dragOverListId, setDragOverListId] = useState<string | null>(null);

  const board = boards.find((b) => b.id === boardId);
  const boardLists = board
    ? (board.listIds
        .map((id) => lists.find((l) => l.id === id))
        .filter(Boolean) as ListType[])
    : [];

  useEffect(() => {
    if (!board && !isLoading && boards.length > 0) router.push('/');
  }, [board, isLoading, boards, router]);

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    await createList(boardId, newListName.trim());
    setNewListName('');
    setShowNewList(false);
    addToast('List created', 'success');
  };

  const handleCreateCard = async (listId: string) => {
    if (!newCardTitle.trim()) return;
    await createCard(listId, newCardTitle.trim());
    setNewCardTitle('');
    setAddingToList(null);
    addToast('Card created', 'success');
  };

  const handleDragStart = (cardId: string) => setDragCardId(cardId);
  const handleDragOver = (e: React.DragEvent, listId: string) => {
    e.preventDefault();
    setDragOverListId(listId);
  };
  const handleDrop = async (e: React.DragEvent, destListId: string) => {
    e.preventDefault();
    if (!dragCardId) return;
    const sourceList = boardLists.find((l) => l.cardIds.includes(dragCardId));
    if (!sourceList) return;
    const destList = boardLists.find((l) => l.id === destListId);
    if (!destList) return;
    await moveCard(
      dragCardId,
      sourceList.id,
      destListId,
      destList.cardIds.length
    );
    setDragCardId(null);
    setDragOverListId(null);
  };

  const getDueDateColor = (due: number | null) => {
    if (!due) return '';
    if (due < Date.now()) return 'badge-error';
    if (due < Date.now() + 86400000) return 'badge-warning';
    return 'badge-success';
  };

  if (!board)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-base-content/50">Loading...</p>
      </div>
    );

  return (
    <div className="bg-base-300 flex h-screen flex-col">
      <header className="border-base-300 bg-base-100 flex items-center gap-3 border-b px-4 py-2">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 text-lg font-bold">{board.name}</h1>
        <button
          type="button"
          onClick={() => toggleStarBoard(board.id)}
          className="btn btn-ghost btn-sm btn-circle">
          <FiStar
            className={`size-5 ${board.starred ? 'fill-warning text-warning' : ''}`}
          />
        </button>
        <Link href={`/board/${boardId}/list`} className="btn btn-ghost btn-sm">
          List
        </Link>
        <Link href={`/board/${boardId}/cal`} className="btn btn-ghost btn-sm">
          Calendar
        </Link>
        <Link
          href={`/board/${boardId}/timeline`}
          className="btn btn-ghost btn-sm">
          Timeline
        </Link>
      </header>

      <div className="flex flex-1 gap-4 overflow-x-auto p-4">
        {boardLists.map((list) => {
          const listCards = list.cardIds
            .map((id) => cards.find((c) => c.id === id))
            .filter(Boolean) as CardType[];
          return (
            <div
              key={list.id}
              className={`bg-base-200 flex w-72 flex-shrink-0 flex-col rounded-lg ${dragOverListId === list.id ? 'ring-primary ring-2' : ''}`}
              onDragOver={(e) => handleDragOver(e, list.id)}
              onDrop={(e) => handleDrop(e, list.id)}>
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">{list.name}</h3>
                  <span className="badge badge-sm">{listCards.length}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateList(list.id, { collapsed: !list.collapsed })
                  }
                  className="btn btn-ghost btn-xs btn-circle">
                  {list.collapsed ? (
                    <FiChevronRight className="size-3" />
                  ) : (
                    <FiChevronDown className="size-3" />
                  )}
                </button>
              </div>

              {!list.collapsed && (
                <div className="flex-1 space-y-2 overflow-auto px-3 pb-3">
                  {listCards.map((card) => (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={() => handleDragStart(card.id)}
                      onClick={() => setSelectedCard(card)}
                      className={`card bg-base-100 cursor-pointer p-2 shadow-sm transition-all hover:shadow-md ${dragCardId === card.id ? 'opacity-50' : ''} ${card.coverColor ? 'border-l-4' : ''}`}
                      style={
                        card.coverColor
                          ? { borderLeftColor: card.coverColor }
                          : undefined
                      }>
                      {card.labels.length > 0 && (
                        <div className="mb-1 flex flex-wrap gap-1">
                          {card.labels.slice(0, 3).map((lid) => {
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
                          {card.labels.length > 3 && (
                            <span className="badge badge-xs">
                              +{card.labels.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-xs font-medium">{card.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs opacity-50">
                        {card.dueDate && (
                          <span
                            className={`badge badge-xs ${getDueDateColor(card.dueDate)}`}>
                            <FiCalendar className="size-2" />{' '}
                            {formatDate(card.dueDate)}
                          </span>
                        )}
                        {card.checklistItems.length > 0 && (
                          <span>
                            {
                              card.checklistItems.filter((i) => i.checked)
                                .length
                            }
                            /{card.checklistItems.length}
                          </span>
                        )}
                        {card.commentCount > 0 && (
                          <span>{card.commentCount} comments</span>
                        )}
                        {card.priority !== 'medium' && (
                          <span
                            className={`badge badge-xs ${priorityColors[card.priority]}`}>
                            {card.priority}
                          </span>
                        )}
                      </div>
                      {card.memberIds.length > 0 && (
                        <div className="mt-1 flex -space-x-1">
                          {card.memberIds.slice(0, 3).map((mid) => {
                            const m = members.find((x) => x.id === mid);
                            return m ? (
                              <div
                                key={mid}
                                className="bg-base-300 border-base-100 flex h-5 w-5 items-center justify-center rounded-full border text-[8px] font-bold">
                                {m.avatar}
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-3 pt-0">
                {addingToList === list.id ? (
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateCard(list.id);
                        if (e.key === 'Escape') {
                          setAddingToList(null);
                          setNewCardTitle('');
                        }
                      }}
                      placeholder="Card title"
                      className="input input-xs flex-1"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleCreateCard(list.id)}
                      className="btn btn-primary btn-xs">
                      <FiCheck className="size-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingToList(null);
                        setNewCardTitle('');
                      }}
                      className="btn btn-ghost btn-xs">
                      <FiX className="size-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddingToList(list.id)}
                    className="btn btn-ghost btn-xs w-full justify-start">
                    <FiPlus className="size-3" /> Add card
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div className="w-72 flex-shrink-0">
          {showNewList ? (
            <div className="bg-base-200 rounded-lg p-3">
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateList();
                  if (e.key === 'Escape') {
                    setShowNewList(false);
                    setNewListName('');
                  }
                }}
                placeholder="List name"
                className="input input-sm w-full"
                autoFocus
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateList}
                  className="btn btn-primary btn-xs">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewList(false);
                    setNewListName('');
                  }}
                  className="btn btn-ghost btn-xs">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowNewList(true)}
              className="btn btn-ghost w-full justify-start">
              <FiPlus className="size-4" /> Add list
            </button>
          )}
        </div>
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-base-100 card max-h-[80vh] w-full max-w-lg overflow-auto shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={selectedCard.title}
                  onChange={(e) =>
                    updateCard(selectedCard.id, { title: e.target.value })
                  }
                  className="input input-ghost flex-1 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="btn btn-ghost btn-sm btn-circle">
                  <FiX className="size-4" />
                </button>
              </div>
              <textarea
                value={selectedCard.description}
                onChange={(e) =>
                  updateCard(selectedCard.id, { description: e.target.value })
                }
                placeholder="Add a description..."
                className="textarea textarea-bordered mt-2 w-full"
                rows={3}
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {labels.map((lbl) => (
                  <button
                    key={lbl.id}
                    type="button"
                    onClick={() => {
                      const newLabels = selectedCard.labels.includes(lbl.id)
                        ? selectedCard.labels.filter((l) => l !== lbl.id)
                        : [...selectedCard.labels, lbl.id];
                      updateCard(selectedCard.id, { labels: newLabels });
                    }}
                    className={`badge badge-sm cursor-pointer ${selectedCard.labels.includes(lbl.id) ? 'opacity-100' : 'opacity-30'}`}
                    style={{ backgroundColor: lbl.color, color: 'white' }}>
                    {lbl.name}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <select
                  value={selectedCard.priority}
                  onChange={(e) =>
                    updateCard(selectedCard.id, {
                      priority: e.target.value as CardType['priority'],
                    })
                  }
                  className="select select-sm">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {selectedCard.checklistItems.length > 0 && (
                <div className="mt-3">
                  <h4 className="mb-1 text-xs font-semibold">Checklist</h4>
                  {selectedCard.checklistItems.map((item) => (
                    <label
                      key={item.id}
                      className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={item.checked}
                        onChange={() =>
                          toggleChecklistItem(selectedCard.id, item.id)
                        }
                      />
                      <span
                        className={`text-sm ${item.checked ? 'line-through opacity-50' : ''}`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    deleteCard(selectedCard.id);
                    setSelectedCard(null);
                    addToast('Card deleted', 'info');
                  }}
                  className="btn btn-ghost btn-sm text-error">
                  <FiTrash2 className="size-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BoardPage: FC = () => (
  <Providers>
    <BoardContent />
  </Providers>
);
export default BoardPage;
