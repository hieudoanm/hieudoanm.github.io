'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  Board,
  List,
  Card,
  Label,
  Member,
  Activity,
  ProjectsSettings,
  ChecklistItem,
} from '@/types';
import { db } from '@/lib/db';
import { seedDatabase } from '@/data/seed';
import { generateId } from '@/data/models';

interface DataContextType {
  boards: Board[];
  lists: List[];
  cards: Card[];
  labels: Label[];
  members: Member[];
  activity: Activity[];
  settings: ProjectsSettings;
  isLoading: boolean;
  createBoard: (name: string, background: string) => Promise<Board>;
  updateBoard: (id: string, updates: Partial<Board>) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  toggleStarBoard: (id: string) => Promise<void>;
  createList: (boardId: string, name: string) => Promise<List>;
  updateList: (id: string, updates: Partial<List>) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  moveList: (
    listId: string,
    boardId: string,
    newIndex: number
  ) => Promise<void>;
  createCard: (listId: string, title: string) => Promise<Card>;
  updateCard: (id: string, updates: Partial<Card>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  moveCard: (
    cardId: string,
    sourceListId: string,
    destListId: string,
    newIndex: number
  ) => Promise<void>;
  toggleChecklistItem: (cardId: string, itemId: string) => Promise<void>;
  addChecklistItem: (cardId: string, text: string) => Promise<void>;
  addActivity: (
    boardId: string,
    cardId: string | null,
    message: string
  ) => Promise<void>;
  updateSettings: (s: Partial<ProjectsSettings>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);
export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [settings, setSettings] = useState<ProjectsSettings>({
    theme: 'night',
    defaultView: 'kanban',
    notifications: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await seedDatabase();
    const [b, l, c, lb, m, a, s] = await Promise.all([
      db.boards.getAll(),
      db.lists.getAll(),
      db.cards.getAll(),
      db.labels.getAll(),
      db.members.getAll(),
      db.activity.getAll(),
      db.settings.get(),
    ]);
    setBoards(b);
    setLists(l);
    setCards(c);
    setLabels(lb);
    setMembers(m);
    setActivity(a.sort((x, y) => y.timestamp - x.timestamp));
    setSettings(s);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const createBoard = useCallback(async (name: string, background: string) => {
    const board: Board = {
      id: generateId(),
      name,
      background,
      starred: false,
      listIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await db.boards.put(board);
    setBoards((p) => [...p, board]);
    return board;
  }, []);

  const updateBoard = useCallback(
    async (id: string, updates: Partial<Board>) => {
      const board = boards.find((b) => b.id === id);
      if (board) {
        const updated = { ...board, ...updates, updatedAt: Date.now() };
        await db.boards.put(updated);
        setBoards((p) => p.map((b) => (b.id === id ? updated : b)));
      }
    },
    [boards]
  );

  const deleteBoard = useCallback(async (id: string) => {
    await db.boards.delete(id);
    setBoards((p) => p.filter((b) => b.id !== id));
  }, []);

  const toggleStarBoard = useCallback(
    async (id: string) => {
      const board = boards.find((b) => b.id === id);
      if (board) {
        const updated = {
          ...board,
          starred: !board.starred,
          updatedAt: Date.now(),
        };
        await db.boards.put(updated);
        setBoards((p) => p.map((b) => (b.id === id ? updated : b)));
      }
    },
    [boards]
  );

  const createList = useCallback(
    async (boardId: string, name: string) => {
      const list: List = {
        id: generateId(),
        boardId,
        name,
        cardIds: [],
        collapsed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.lists.put(list);
      setLists((p) => [...p, list]);
      const board = boards.find((b) => b.id === boardId);
      if (board) {
        const updated = {
          ...board,
          listIds: [...board.listIds, list.id],
          updatedAt: Date.now(),
        };
        await db.boards.put(updated);
        setBoards((p) => p.map((b) => (b.id === boardId ? updated : b)));
      }
      return list;
    },
    [boards]
  );

  const updateList = useCallback(
    async (id: string, updates: Partial<List>) => {
      const list = lists.find((l) => l.id === id);
      if (list) {
        const updated = { ...list, ...updates, updatedAt: Date.now() };
        await db.lists.put(updated);
        setLists((p) => p.map((l) => (l.id === id ? updated : l)));
      }
    },
    [lists]
  );

  const deleteList = useCallback(
    async (id: string) => {
      const list = lists.find((l) => l.id === id);
      if (list) {
        await db.lists.delete(id);
        setLists((p) => p.filter((l) => l.id !== id));
        const board = boards.find((b) => b.id === list.boardId);
        if (board) {
          const updated = {
            ...board,
            listIds: board.listIds.filter((lid) => lid !== id),
            updatedAt: Date.now(),
          };
          await db.boards.put(updated);
          setBoards((p) => p.map((b) => (b.id === list.boardId ? updated : b)));
        }
      }
    },
    [lists, boards]
  );

  const moveList = useCallback(
    async (listId: string, boardId: string, newIndex: number) => {
      const board = boards.find((b) => b.id === boardId);
      if (!board) return;
      const oldIndex = board.listIds.indexOf(listId);
      if (oldIndex === -1) return;
      const newListIds = [...board.listIds];
      newListIds.splice(oldIndex, 1);
      newListIds.splice(newIndex, 0, listId);
      const updated = { ...board, listIds: newListIds, updatedAt: Date.now() };
      await db.boards.put(updated);
      setBoards((p) => p.map((b) => (b.id === boardId ? updated : b)));
    },
    [boards]
  );

  const createCard = useCallback(
    async (listId: string, title: string) => {
      const card: Card = {
        id: generateId(),
        listId,
        title,
        description: '',
        labels: [],
        dueDate: null,
        priority: 'medium',
        memberIds: [],
        checklistItems: [],
        commentCount: 0,
        coverColor: null,
        archived: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await db.cards.put(card);
      setCards((p) => [...p, card]);
      const list = lists.find((l) => l.id === listId);
      if (list) {
        const updated = {
          ...list,
          cardIds: [...list.cardIds, card.id],
          updatedAt: Date.now(),
        };
        await db.lists.put(updated);
        setLists((p) => p.map((l) => (l.id === listId ? updated : l)));
      }
      return card;
    },
    [lists]
  );

  const updateCard = useCallback(
    async (id: string, updates: Partial<Card>) => {
      const card = cards.find((c) => c.id === id);
      if (card) {
        const updated = { ...card, ...updates, updatedAt: Date.now() };
        await db.cards.put(updated);
        setCards((p) => p.map((c) => (c.id === id ? updated : c)));
      }
    },
    [cards]
  );

  const deleteCard = useCallback(
    async (id: string) => {
      const card = cards.find((c) => c.id === id);
      if (card) {
        await db.cards.delete(id);
        setCards((p) => p.filter((c) => c.id !== id));
        const list = lists.find((l) => l.id === card.listId);
        if (list) {
          const updated = {
            ...list,
            cardIds: list.cardIds.filter((cid) => cid !== id),
            updatedAt: Date.now(),
          };
          await db.lists.put(updated);
          setLists((p) => p.map((l) => (l.id === card.listId ? updated : l)));
        }
      }
    },
    [cards, lists]
  );

  const moveCard = useCallback(
    async (
      cardId: string,
      sourceListId: string,
      destListId: string,
      newIndex: number
    ) => {
      const card = cards.find((c) => c.id === cardId);
      if (!card) return;
      const updatedCard = {
        ...card,
        listId: destListId,
        updatedAt: Date.now(),
      };
      await db.cards.put(updatedCard);
      setCards((p) => p.map((c) => (c.id === cardId ? updatedCard : c)));

      const sourceList = lists.find((l) => l.id === sourceListId);
      const destList = lists.find((l) => l.id === destListId);
      if (sourceList) {
        const srcUpdated = {
          ...sourceList,
          cardIds: sourceList.cardIds.filter((cid) => cid !== cardId),
          updatedAt: Date.now(),
        };
        await db.lists.put(srcUpdated);
        setLists((p) => p.map((l) => (l.id === sourceListId ? srcUpdated : l)));
      }
      if (destList) {
        const destCardIds = [
          ...destList.cardIds.filter((cid) => cid !== cardId),
        ];
        destCardIds.splice(newIndex, 0, cardId);
        const destUpdated = {
          ...destList,
          cardIds: destCardIds,
          updatedAt: Date.now(),
        };
        await db.lists.put(destUpdated);
        setLists((p) => p.map((l) => (l.id === destListId ? destUpdated : l)));
      }
    },
    [cards, lists]
  );

  const toggleChecklistItem = useCallback(
    async (cardId: string, itemId: string) => {
      const card = cards.find((c) => c.id === cardId);
      if (card) {
        const items = card.checklistItems.map((i) =>
          i.id === itemId ? { ...i, checked: !i.checked } : i
        );
        const updated = {
          ...card,
          checklistItems: items,
          updatedAt: Date.now(),
        };
        await db.cards.put(updated);
        setCards((p) => p.map((c) => (c.id === cardId ? updated : c)));
      }
    },
    [cards]
  );

  const addChecklistItem = useCallback(
    async (cardId: string, text: string) => {
      const card = cards.find((c) => c.id === cardId);
      if (card) {
        const item: ChecklistItem = { id: generateId(), text, checked: false };
        const updated = {
          ...card,
          checklistItems: [...card.checklistItems, item],
          updatedAt: Date.now(),
        };
        await db.cards.put(updated);
        setCards((p) => p.map((c) => (c.id === cardId ? updated : c)));
      }
    },
    [cards]
  );

  const addActivity = useCallback(
    async (boardId: string, cardId: string | null, message: string) => {
      const a: Activity = {
        id: generateId(),
        boardId,
        cardId,
        message,
        userId: 'mem-1',
        timestamp: Date.now(),
      };
      await db.activity.put(a);
      setActivity((p) => [a, ...p]);
    },
    []
  );

  const updateSettings = useCallback(
    async (partial: Partial<ProjectsSettings>) => {
      const updated = { ...settings, ...partial };
      await db.settings.put(updated);
      setSettings(updated);
    },
    [settings]
  );

  return (
    <DataContext.Provider
      value={{
        boards,
        lists,
        cards,
        labels,
        members,
        activity,
        settings,
        isLoading,
        createBoard,
        updateBoard,
        deleteBoard,
        toggleStarBoard,
        createList,
        updateList,
        deleteList,
        moveList,
        createCard,
        updateCard,
        deleteCard,
        moveCard,
        toggleChecklistItem,
        addChecklistItem,
        addActivity,
        updateSettings,
        refreshData,
      }}>
      {children}
    </DataContext.Provider>
  );
};
