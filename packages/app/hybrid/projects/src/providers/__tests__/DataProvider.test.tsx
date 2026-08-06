import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import type { Board, Card, List } from '@/types';

jest.mock('@/lib/db', () => ({
  db: {
    boards: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    lists: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    cards: {
      getAll: jest.fn(),
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
    labels: { getAll: jest.fn(), put: jest.fn() },
    members: { getAll: jest.fn(), put: jest.fn() },
    activity: { getAll: jest.fn(), put: jest.fn() },
    settings: { get: jest.fn(), put: jest.fn() },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
}));

const { db } = jest.requireMock('@/lib/db');
const { seedDatabase } = jest.requireMock('@/data/seed');

const board = (id: string): Board => ({
  id,
  name: `Board ${id}`,
  background: '#3b82f6',
  starred: false,
  listIds: [],
  createdAt: 1000,
  updatedAt: 1000,
});

const list = (id: string): List => ({
  id,
  boardId: 'board-1',
  name: `List ${id}`,
  cardIds: [],
  collapsed: false,
  createdAt: 1000,
  updatedAt: 1000,
});

const card = (id: string): Card => ({
  id,
  listId: 'list-1',
  title: `Card ${id}`,
  description: '',
  labels: [],
  dueDate: null,
  priority: 'medium',
  memberIds: [],
  checklistItems: [],
  commentCount: 0,
  coverColor: null,
  archived: false,
  createdAt: 1000,
  updatedAt: 1000,
});

const Consumer = () => {
  const data = useData();
  return (
    <div>
      <span data-testid="board-count">{data.boards.length}</span>
      <span data-testid="board-starred">
        {data.boards[0]?.starred ? 'starred' : 'unstarred'}
      </span>
      <span data-testid="board-list-ids">
        {data.boards[0]?.listIds.join(',')}
      </span>
      <span data-testid="list-count">{data.lists.length}</span>
      <span data-testid="list-collapsed">
        {String(data.lists[0]?.collapsed)}
      </span>
      <span data-testid="card-count">{data.cards.length}</span>
      <span data-testid="card-title">{data.cards[0]?.title}</span>
      <span data-testid="card-list">{data.cards[0]?.listId}</span>
      <span data-testid="item-checked">
        {String(data.cards[0]?.checklistItems[0]?.checked)}
      </span>
      <span data-testid="item-count">
        {data.cards[0]?.checklistItems.length}
      </span>
      <span data-testid="activity-count">{data.activity.length}</span>
      <span data-testid="board-name">{data.boards[0]?.name}</span>
      <span data-testid="theme">{data.settings.theme}</span>
      <span data-testid="is-loading">{String(data.isLoading)}</span>
      <button onClick={() => data.createBoard('New', '#ff0000')}>
        create-board
      </button>
      <button onClick={() => data.updateBoard('board-1', { name: 'Renamed' })}>
        update-board
      </button>
      <button onClick={() => data.deleteBoard('board-1')}>delete-board</button>
      <button onClick={() => data.toggleStarBoard('board-1')}>
        toggle-star
      </button>
      <button onClick={() => data.createList('board-1', 'To Do')}>
        create-list
      </button>
      <button onClick={() => data.updateList('list-1', { collapsed: true })}>
        update-list
      </button>
      <button onClick={() => data.deleteList('list-1')}>delete-list</button>
      <button onClick={() => data.moveList('list-2', 'board-1', 0)}>
        move-list
      </button>
      <button onClick={() => data.createCard('list-1', 'Write tests')}>
        create-card
      </button>
      <button onClick={() => data.updateCard('card-1', { title: 'Titled' })}>
        update-card
      </button>
      <button onClick={() => data.deleteCard('card-1')}>delete-card</button>
      <button onClick={() => data.moveCard('card-1', 'list-1', 'list-2', 0)}>
        move-card
      </button>
      <button onClick={() => data.toggleChecklistItem('card-1', 'cl-1')}>
        toggle-item
      </button>
      <button onClick={() => data.addChecklistItem('card-1', 'New item')}>
        add-item
      </button>
      <button onClick={() => data.addActivity('board-1', 'card-1', 'Moved')}>
        add-activity
      </button>
      <button onClick={() => data.updateSettings({ theme: 'dark' })}>
        update-settings
      </button>
      <button onClick={() => data.refreshData()}>refresh</button>
      <button onClick={() => data.updateBoard('missing', { name: 'X' })}>
        update-board-missing
      </button>
      <button onClick={() => data.toggleStarBoard('missing')}>
        toggle-star-missing
      </button>
      <button onClick={() => data.createList('missing', 'X')}>
        create-list-missing-board
      </button>
      <button onClick={() => data.updateList('missing', { collapsed: true })}>
        update-list-missing
      </button>
      <button onClick={() => data.deleteList('missing')}>
        delete-list-missing
      </button>
      <button onClick={() => data.moveList('list-2', 'missing', 0)}>
        move-list-missing-board
      </button>
      <button onClick={() => data.moveList('missing', 'board-1', 0)}>
        move-list-missing-id
      </button>
      <button onClick={() => data.createCard('missing', 'X')}>
        create-card-missing-list
      </button>
      <button onClick={() => data.updateCard('missing', { title: 'X' })}>
        update-card-missing
      </button>
      <button onClick={() => data.deleteCard('missing')}>
        delete-card-missing
      </button>
      <button onClick={() => data.moveCard('missing', 'list-1', 'list-2', 0)}>
        move-card-missing
      </button>
      <button onClick={() => data.moveCard('card-1', 'missing', 'list-2', 0)}>
        move-card-missing-src
      </button>
      <button onClick={() => data.moveCard('card-1', 'list-1', 'missing', 0)}>
        move-card-missing-dest
      </button>
      <button onClick={() => data.toggleChecklistItem('missing', 'x')}>
        toggle-item-missing
      </button>
      <button onClick={() => data.addChecklistItem('missing', 'x')}>
        add-item-missing
      </button>
    </div>
  );
};

const renderProvider = () =>
  render(
    <DataProvider>
      <Consumer />
    </DataProvider>
  );

const seedStore = () => {
  db.boards.getAll.mockResolvedValue([
    { ...board('board-1'), listIds: ['list-1', 'list-2'] },
    board('board-2'),
  ]);
  db.lists.getAll.mockResolvedValue([
    { ...list('list-1'), cardIds: ['card-1'] },
    { ...list('list-2'), cardIds: ['card-1'] },
  ]);
  db.cards.getAll.mockResolvedValue([
    {
      ...card('card-1'),
      checklistItems: [{ id: 'cl-1', text: 'Login', checked: false }],
    },
  ]);
  db.labels.getAll.mockResolvedValue([
    { id: 'lbl-1', name: 'Bug', color: '#f00' },
  ]);
  db.members.getAll.mockResolvedValue([
    { id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' },
  ]);
  db.activity.getAll.mockResolvedValue([
    {
      id: 'act-2',
      boardId: 'board-1',
      cardId: null,
      message: 'old',
      userId: 'mem-1',
      timestamp: 100,
    },
    {
      id: 'act-1',
      boardId: 'board-1',
      cardId: null,
      message: 'new',
      userId: 'mem-1',
      timestamp: 200,
    },
  ]);
  db.settings.get.mockResolvedValue({
    theme: 'nothing',
    defaultView: 'kanban',
    notifications: true,
  });
};

describe('DataProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    seedStore();
  });

  it('throws when used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useData())).toThrow(
      'useData must be used within DataProvider'
    );
    spy.mockRestore();
  });

  it('loads data on mount and seeds the database', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('2')
    );
    expect(seedDatabase).toHaveBeenCalled();
    expect(screen.getByTestId('list-count').textContent).toBe('2');
    expect(screen.getByTestId('card-count').textContent).toBe('1');
    expect(screen.getByTestId('is-loading').textContent).toBe('false');
  });

  it('creates and persists a board', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('create-board'));
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('3')
    );
    expect(db.boards.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'New', background: '#ff0000' })
    );
  });

  it('updates a board', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('update-board'));
    await waitFor(() =>
      expect(screen.getByTestId('board-name').textContent).toBe('Renamed')
    );
    expect(db.boards.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Renamed' })
    );
  });

  it('deletes a board', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('delete-board'));
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('1')
    );
    expect(db.boards.delete).toHaveBeenCalledWith('board-1');
  });

  it('toggles a board star', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('toggle-star'));
    await waitFor(() =>
      expect(screen.getByTestId('board-starred').textContent).toBe('starred')
    );
    expect(db.boards.put).toHaveBeenCalledWith(
      expect.objectContaining({ starred: true })
    );
  });

  it('creates a list and appends it to the board', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('list-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('create-list'));
    await waitFor(() =>
      expect(screen.getByTestId('list-count').textContent).toBe('3')
    );
    expect(db.boards.put).toHaveBeenCalledWith(
      expect.objectContaining({
        listIds: expect.arrayContaining([expect.any(String)]),
      })
    );
  });

  it('updates a list', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('list-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('update-list'));
    await waitFor(() =>
      expect(screen.getByTestId('list-collapsed').textContent).toBe('true')
    );
    expect(db.lists.put).toHaveBeenCalledWith(
      expect.objectContaining({ collapsed: true })
    );
  });

  it('deletes a list and removes it from the board', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('list-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('delete-list'));
    await waitFor(() =>
      expect(screen.getByTestId('list-count').textContent).toBe('1')
    );
    expect(db.boards.put).toHaveBeenCalledWith(
      expect.objectContaining({ listIds: ['list-2'] })
    );
  });

  it('moves a list to a new index', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('list-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('move-list'));
    await waitFor(() =>
      expect(screen.getByTestId('board-list-ids').textContent).toBe(
        'list-2,list-1'
      )
    );
    expect(db.boards.put).toHaveBeenCalledWith(
      expect.objectContaining({ listIds: ['list-2', 'list-1'] })
    );
  });

  it('creates a card and appends it to the list', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('card-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('create-card'));
    await waitFor(() =>
      expect(screen.getByTestId('card-count').textContent).toBe('2')
    );
    expect(db.lists.put).toHaveBeenCalledWith(
      expect.objectContaining({
        cardIds: expect.arrayContaining([expect.any(String)]),
      })
    );
  });

  it('updates a card', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('card-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('update-card'));
    await waitFor(() =>
      expect(screen.getByTestId('card-title').textContent).toBe('Titled')
    );
    expect(db.cards.put).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Titled' })
    );
  });

  it('deletes a card and removes it from the list', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('card-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('delete-card'));
    await waitFor(() =>
      expect(screen.getByTestId('card-count').textContent).toBe('0')
    );
    expect(db.lists.put).toHaveBeenCalledWith(
      expect.objectContaining({ cardIds: [] })
    );
  });

  it('moves a card between lists', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('card-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('move-card'));
    await waitFor(() =>
      expect(screen.getByTestId('card-list').textContent).toBe('list-2')
    );
    expect(db.cards.put).toHaveBeenCalledWith(
      expect.objectContaining({ listId: 'list-2' })
    );
    expect(db.lists.put).toHaveBeenCalledWith(
      expect.objectContaining({ cardIds: expect.arrayContaining(['card-1']) })
    );
  });

  it('toggles a checklist item', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('card-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('toggle-item'));
    await waitFor(() =>
      expect(screen.getByTestId('item-checked').textContent).toBe('true')
    );
    expect(db.cards.put).toHaveBeenCalledWith(
      expect.objectContaining({
        checklistItems: [{ id: 'cl-1', text: 'Login', checked: true }],
      })
    );
  });

  it('adds a checklist item', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('card-count').textContent).toBe('1')
    );
    fireEvent.click(screen.getByText('add-item'));
    await waitFor(() =>
      expect(screen.getByTestId('item-count').textContent).toBe('2')
    );
    expect(db.cards.put).toHaveBeenCalledWith(
      expect.objectContaining({
        checklistItems: [
          { id: 'cl-1', text: 'Login', checked: false },
          expect.objectContaining({ text: 'New item', checked: false }),
        ],
      })
    );
  });

  it('adds activity at the front of the feed', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('add-activity'));
    await waitFor(() =>
      expect(screen.getByTestId('activity-count').textContent).toBe('3')
    );
    expect(db.activity.put).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Moved', userId: 'mem-1' })
    );
  });

  it('updates settings', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('theme').textContent).toBe('nothing')
    );
    fireEvent.click(screen.getByText('update-settings'));
    await waitFor(() =>
      expect(screen.getByTestId('theme').textContent).toBe('dark')
    );
    expect(db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({ theme: 'dark' })
    );
  });

  it('refreshes data on demand', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('2')
    );
    db.boards.getAll.mockResolvedValue([
      board('board-1'),
      board('board-2'),
      board('board-3'),
    ]);
    fireEvent.click(screen.getByText('refresh'));
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('3')
    );
  });

  it('no-ops when boards, lists, or cards do not exist', async () => {
    renderProvider();
    await waitFor(() =>
      expect(screen.getByTestId('board-count').textContent).toBe('2')
    );
    fireEvent.click(screen.getByText('update-board-missing'));
    fireEvent.click(screen.getByText('toggle-star-missing'));
    fireEvent.click(screen.getByText('create-list-missing-board'));
    fireEvent.click(screen.getByText('update-list-missing'));
    fireEvent.click(screen.getByText('delete-list-missing'));
    fireEvent.click(screen.getByText('move-list-missing-board'));
    fireEvent.click(screen.getByText('move-list-missing-id'));
    fireEvent.click(screen.getByText('create-card-missing-list'));
    fireEvent.click(screen.getByText('update-card-missing'));
    fireEvent.click(screen.getByText('delete-card-missing'));
    fireEvent.click(screen.getByText('move-card-missing'));
    fireEvent.click(screen.getByText('move-card-missing-src'));
    fireEvent.click(screen.getByText('move-card-missing-dest'));
    fireEvent.click(screen.getByText('toggle-item-missing'));
    fireEvent.click(screen.getByText('add-item-missing'));
    await waitFor(() => {
      expect(db.boards.put).not.toHaveBeenCalled();
      expect(db.boards.delete).not.toHaveBeenCalled();
      expect(db.lists.delete).not.toHaveBeenCalled();
      expect(db.cards.delete).not.toHaveBeenCalled();
    });
  });
});
