import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import BoardPage from '@/app/board/page';
import { useData } from '@/providers/DataProvider';

const push = jest.fn();
const useSearchParams = jest.fn();
const mockAddToast = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get: useSearchParams }),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast: mockAddToast }),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('react-icons/fi', () => {
  const icons = [
    'FiArrowLeft',
    'FiPlus',
    'FiMoreHorizontal',
    'FiStar',
    'FiX',
    'FiCheck',
    'FiCalendar',
    'FiTag',
    'FiUser',
    'FiTrash2',
    'FiChevronDown',
    'FiChevronRight',
    'FiSearch',
    'FiArchive',
    'FiCopy',
    'FiRotateCcw',
    'FiBookmark',
    'FiActivity',
    'FiSend',
    'FiBell',
    'FiUsers',
    'FiShare2',
    'FiDownload',
    'FiClock',
    'FiAtSign',
    'FiUserPlus',
    'FiCheck',
  ];
  const map: Record<string, React.FC<Record<string, unknown>>> = {};
  icons.forEach((name) => {
    map[name] = (props: Record<string, unknown>) => (
      <span data-testid={name} {...props} />
    );
  });
  return map;
});

const baseData = () => ({
  boards: [
    {
      id: 'board-1',
      name: 'Alpha',
      background: '#3b82f6',
      starred: false,
      listIds: ['list-1', 'list-2'],
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  lists: [
    {
      id: 'list-1',
      boardId: 'board-1',
      name: 'To Do',
      cardIds: ['card-1', 'card-2'],
      collapsed: false,
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: 'list-2',
      boardId: 'board-1',
      name: 'Done',
      cardIds: [],
      collapsed: false,
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  cards: [
    {
      id: 'card-1',
      listId: 'list-1',
      title: 'Write tests',
      description: '',
      labels: ['lbl-1'],
      dueDate: Date.now() + 86400000 * 10,
      priority: 'high',
      memberIds: ['mem-1'],
      checklistItems: [{ id: 'cl-1', text: 'Login', checked: false }],
      comments: [
        { id: 'cmt-1', text: 'First', author: 'A', createdAt: 1000 },
        { id: 'cmt-2', text: 'Second', author: 'A', createdAt: 2000 },
      ],
      coverColor: null,
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: 'card-2',
      listId: 'list-1',
      title: 'Overdue task',
      description: 'Fix the bug',
      labels: [],
      dueDate: Date.now() - 1000,
      priority: 'low',
      memberIds: [],
      checklistItems: [],
      comments: [],
      coverColor: '#22c55e',
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  labels: [{ id: 'lbl-1', name: 'Bug', color: '#f00' }],
  members: [{ id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' }],
  activity: [
    {
      id: 'act-1',
      boardId: 'board-1',
      cardId: 'card-1',
      message: 'Alice Chen moved "Write tests" to Done',
      userId: 'mem-1',
      timestamp: Date.now() - 3600000,
    },
    {
      id: 'act-other',
      boardId: 'board-2',
      cardId: null,
      message: 'Activity on another board',
      userId: 'mem-1',
      timestamp: Date.now(),
    },
  ],
  settings: {
    theme: 'nothing',
    defaultView: 'kanban',
    notifications: true,
    notificationsReadAt: 0,
  },
  createList: jest.fn().mockResolvedValue({
    id: 'list-new',
    name: 'New list',
  }),
  updateList: jest.fn().mockResolvedValue(undefined),
  moveList: jest.fn().mockResolvedValue(undefined),
  createCard: jest.fn().mockResolvedValue({
    id: 'card-new',
    title: 'New card',
  }),
  moveCard: jest.fn().mockResolvedValue(undefined),
  deleteCard: jest.fn().mockResolvedValue(undefined),
  updateCard: jest.fn().mockResolvedValue(undefined),
  updateBoard: jest.fn().mockResolvedValue(undefined),
  toggleChecklistItem: jest.fn().mockResolvedValue(undefined),
  addChecklistItem: jest.fn().mockResolvedValue(undefined),
  toggleStarBoard: jest.fn().mockResolvedValue(undefined),
  addActivity: jest.fn().mockResolvedValue(undefined),
  updateSettings: jest.fn().mockResolvedValue(undefined),
  archiveList: jest.fn().mockResolvedValue(undefined),
  restoreList: jest.fn().mockResolvedValue(undefined),
  copyList: jest.fn().mockResolvedValue(undefined),
  archiveCard: jest.fn().mockResolvedValue(undefined),
  restoreCard: jest.fn().mockResolvedValue(undefined),
  isLoading: false,
});

const renderBoard = () => {
  useSearchParams.mockReturnValue('board-1');
  return render(<BoardPage />);
};

describe('BoardPage', () => {
  beforeAll(() => {
    document.elementFromPoint =
      jest.fn() as unknown as typeof document.elementFromPoint;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    useSearchParams.mockReset();
    localStorage.clear();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('shows loading when no board id is given', () => {
    useSearchParams.mockReturnValue(null);
    render(<BoardPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the board header, lists, and cards', () => {
    renderBoard();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
    expect(screen.getAllByText('Bug').length).toBeGreaterThan(0);
    expect(screen.getByText('2 comments')).toBeInTheDocument();
    expect(
      screen
        .getByText('Write tests')
        .closest('[draggable]')!
        .textContent!.includes('0/1')
    ).toBe(true);
  });

  it('renders a card cover image', () => {
    useSearchParams.mockReturnValue('board-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          coverImage: 'https://picsum.photos/seed/cover/400/240',
        },
      ],
    } as never);
    renderBoard();
    expect(screen.getByAltText('Card cover')).toBeInTheDocument();
  });

  it('renders due-soon and extra-label badges', () => {
    useSearchParams.mockReturnValue('board-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      lists: [
        { ...baseData().lists[0], cardIds: ['card-1', 'card-2', 'card-3'] },
      ],
      cards: [
        ...baseData().cards,
        {
          ...baseData().cards[0],
          id: 'card-3',
          title: 'Due soon',
          dueDate: Date.now() + 3600000,
          labels: ['lbl-1', 'lbl-missing', 'lbl-3', 'lbl-4'],
          memberIds: [],
          priority: 'medium',
        },
      ],
      labels: [
        { id: 'lbl-1', name: 'Bug', color: '#f00' },
        { id: 'lbl-3', name: 'B', color: '#00f' },
        { id: 'lbl-4', name: 'C', color: '#ff0' },
      ],
    } as never);
    render(<BoardPage />);
    expect(screen.getByText('Due soon')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('links to the other views', () => {
    renderBoard();
    expect(screen.getByRole('link', { name: 'List' })).toHaveAttribute(
      'href',
      '/board/list?id=board-1'
    );
    expect(screen.getByRole('link', { name: 'Calendar' })).toHaveAttribute(
      'href',
      '/board/cal?id=board-1'
    );
    expect(screen.getByRole('link', { name: 'Timeline' })).toHaveAttribute(
      'href',
      '/board/timeline?id=board-1'
    );
  });

  it('navigates back home', () => {
    renderBoard();
    fireEvent.click(screen.getByTestId('FiArrowLeft').closest('button')!);
    expect(push).toHaveBeenCalledWith('/');
  });

  it('toggles the board star', () => {
    renderBoard();
    fireEvent.click(screen.getByTestId('FiStar').closest('button')!);
    expect(jest.mocked(useData)().toggleStarBoard).toHaveBeenCalledWith(
      'board-1'
    );
  });

  it('adds a card via the check button', async () => {
    renderBoard();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add card' })[0]);
    fireEvent.change(screen.getByPlaceholderText('Card title'), {
      target: { value: 'Ship it' },
    });
    fireEvent.click(screen.getByTestId('FiCheck').closest('button')!);
    await waitFor(() =>
      expect(jest.mocked(useData)().createCard).toHaveBeenCalledWith(
        'list-1',
        'Ship it'
      )
    );
  });

  it('cancels adding a card via the X button', () => {
    renderBoard();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add card' })[0]);
    fireEvent.change(screen.getByPlaceholderText('Card title'), {
      target: { value: 'Nope' },
    });
    fireEvent.click(screen.getByTestId('FiX').closest('button')!);
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
  });

  it('cancels creating a list via the Cancel button', () => {
    renderBoard();
    fireEvent.click(screen.getByRole('button', { name: 'Add list' }));
    fireEvent.change(screen.getByPlaceholderText('List name'), {
      target: { value: 'Nope' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByPlaceholderText('List name')).not.toBeInTheDocument();
  });

  it('closes the card modal', () => {
    renderBoard();
    fireEvent.click(screen.getByText('Write tests'));
    expect(screen.getByDisplayValue('Write tests')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('FiX').closest('button')!);
    expect(screen.queryByDisplayValue('Write tests')).not.toBeInTheDocument();
  });

  it('creates a list', async () => {
    renderBoard();
    fireEvent.click(screen.getByRole('button', { name: 'Add list' }));
    fireEvent.change(screen.getByPlaceholderText('List name'), {
      target: { value: 'Review' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    await waitFor(() =>
      expect(jest.mocked(useData)().createList).toHaveBeenCalledWith(
        'board-1',
        'Review'
      )
    );
  });

  it('creates a list on Enter and cancels on Escape', async () => {
    renderBoard();
    fireEvent.click(screen.getByRole('button', { name: 'Add list' }));
    const input = screen.getByPlaceholderText('List name');
    fireEvent.change(input, { target: { value: 'Review' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() =>
      expect(jest.mocked(useData)().createList).toHaveBeenCalledWith(
        'board-1',
        'Review'
      )
    );
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Add list' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add list' }));
    fireEvent.keyDown(screen.getByPlaceholderText('List name'), {
      key: 'Escape',
    });
    expect(screen.queryByPlaceholderText('List name')).not.toBeInTheDocument();
  });

  it('adds a card to a list', async () => {
    renderBoard();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add card' })[0]);
    fireEvent.change(screen.getByPlaceholderText('Card title'), {
      target: { value: 'Ship it' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('Card title'), {
      key: 'Enter',
    });
    await waitFor(() =>
      expect(jest.mocked(useData)().createCard).toHaveBeenCalledWith(
        'list-1',
        'Ship it'
      )
    );
  });

  it('cancels adding a card on Escape', () => {
    renderBoard();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add card' })[0]);
    fireEvent.keyDown(screen.getByPlaceholderText('Card title'), {
      key: 'Escape',
    });
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Add card' })[0]
    ).toBeInTheDocument();
  });

  it('collapses a list', () => {
    renderBoard();
    const listContainer =
      screen.getByText('To Do').parentElement!.parentElement!;
    fireEvent.click(listContainer.querySelectorAll('button')[1]!);
    expect(jest.mocked(useData)().updateList).toHaveBeenCalledWith('list-1', {
      collapsed: true,
    });
  });

  it('moves a card to another list via drag and drop', async () => {
    renderBoard();
    const cardEl = screen.getByText('Write tests').closest('[draggable]')!;
    const destList = screen.getByText('Done').parentElement!.parentElement!;
    fireEvent.dragStart(cardEl);
    fireEvent.dragOver(destList);
    fireEvent.drop(destList);
    await waitFor(() =>
      expect(jest.mocked(useData)().moveCard).toHaveBeenCalledWith(
        'card-1',
        'list-1',
        'list-2',
        0
      )
    );
  });

  it('reorders lists via drag and drop', async () => {
    renderBoard();
    const listEl = screen.getByText('To Do').closest('[draggable]')!;
    const destList = screen.getByText('Done').parentElement!.parentElement!;
    fireEvent.dragStart(listEl);
    fireEvent.dragOver(destList);
    fireEvent.drop(destList);
    await waitFor(() =>
      expect(jest.mocked(useData)().moveList).toHaveBeenCalledWith(
        'list-1',
        'board-1',
        1
      )
    );
  });

  it('filters cards by title search', () => {
    renderBoard();
    fireEvent.change(screen.getByLabelText('Search cards'), {
      target: { value: 'overdue' },
    });
    const marks = screen
      .getAllByText('Overdue')
      .filter((el) => el.tagName === 'MARK');
    expect(marks).toHaveLength(1);
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('shows a drop placeholder when dragging a card over a list', () => {
    renderBoard();
    const cardEl = screen.getByText('Write tests').closest('[draggable]')!;
    const destList = screen.getByText('Done').parentElement!.parentElement!;
    fireEvent.dragStart(cardEl);
    fireEvent.dragOver(destList);
    expect(screen.getByText('Drop here')).toBeInTheDocument();
  });

  it('focuses search with the Q and F shortcuts', () => {
    renderBoard();
    const search = screen.getByLabelText('Search cards');
    fireEvent.keyDown(window, { key: 'q' });
    expect(search).toHaveFocus();
    fireEvent.keyDown(window, { key: 'f' });
    expect(search).toHaveFocus();
  });

  it('opens add card with the N shortcut', () => {
    renderBoard();
    fireEvent.keyDown(window, { key: 'n' });
    expect(screen.getByPlaceholderText('Card title')).toBeInTheDocument();
  });

  it('ignores shortcuts while typing in an input', () => {
    renderBoard();
    fireEvent.keyDown(screen.getByLabelText('Search cards'), { key: 'n' });
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
  });

  it('moves a card via long-press touch drag', async () => {
    jest.useFakeTimers();
    try {
      renderBoard();
      const cardEl = screen.getByText('Write tests').closest('[draggable]')!;
      const destList = screen.getByText('Done').closest('[data-list-id]')!;
      const spy = jest
        .spyOn(document, 'elementFromPoint')
        .mockReturnValue(destList as unknown as Element);
      fireEvent.touchStart(cardEl, {
        touches: [{ clientX: 0, clientY: 0 }],
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });
      fireEvent.touchEnd(cardEl, {
        changedTouches: [{ clientX: 50, clientY: 50 }],
      });
      expect(jest.mocked(useData)().moveCard).toHaveBeenCalledWith(
        'card-1',
        'list-1',
        'list-2',
        0
      );
      await act(async () => {
        await Promise.resolve();
      });
      fireEvent.click(cardEl);
      expect(screen.queryByDisplayValue('Write tests')).not.toBeInTheDocument();
      spy.mockRestore();
    } finally {
      jest.useRealTimers();
    }
  });

  it('reorders lists via long-press touch drag', () => {
    jest.useFakeTimers();
    try {
      renderBoard();
      const listEl = screen.getByText('To Do').closest('[draggable]')!;
      const destList = screen.getByText('Done').closest('[data-list-id]')!;
      const spy = jest
        .spyOn(document, 'elementFromPoint')
        .mockReturnValue(destList as unknown as Element);
      fireEvent.touchStart(listEl, {
        touches: [{ clientX: 0, clientY: 0 }],
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });
      fireEvent.touchEnd(listEl, {
        changedTouches: [{ clientX: 50, clientY: 50 }],
      });
      expect(jest.mocked(useData)().moveList).toHaveBeenCalledWith(
        'list-1',
        'board-1',
        1
      );
      spy.mockRestore();
    } finally {
      jest.useRealTimers();
    }
  });

  it('cancels long-press when the finger moves', () => {
    jest.useFakeTimers();
    try {
      renderBoard();
      const cardEl = screen.getByText('Write tests').closest('[draggable]')!;
      fireEvent.touchStart(cardEl, {
        touches: [{ clientX: 0, clientY: 0 }],
      });
      fireEvent.touchMove(cardEl, {
        touches: [{ clientX: 30, clientY: 30 }],
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });
      fireEvent.touchEnd(cardEl, {
        changedTouches: [{ clientX: 30, clientY: 30 }],
      });
      expect(jest.mocked(useData)().moveCard).not.toHaveBeenCalled();
    } finally {
      jest.useRealTimers();
    }
  });

  it('cancels long-press on touch cancel', () => {
    jest.useFakeTimers();
    try {
      renderBoard();
      const cardEl = screen.getByText('Write tests').closest('[draggable]')!;
      fireEvent.touchStart(cardEl, {
        touches: [{ clientX: 0, clientY: 0 }],
      });
      act(() => {
        jest.advanceTimersByTime(500);
      });
      fireEvent.touchCancel(cardEl);
      fireEvent.touchEnd(cardEl, {
        changedTouches: [{ clientX: 50, clientY: 50 }],
      });
      expect(jest.mocked(useData)().moveCard).not.toHaveBeenCalled();
    } finally {
      jest.useRealTimers();
    }
  });

  it('opens a card modal and edits its fields', () => {
    renderBoard();
    fireEvent.click(screen.getByText('Write tests'));
    const title = screen.getByDisplayValue('Write tests');
    fireEvent.change(title, { target: { value: 'Write more tests' } });
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      title: 'Write more tests',
    });
    fireEvent.change(screen.getByPlaceholderText('Add a description...'), {
      target: { value: 'Updated description' },
    });
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      description: 'Updated description',
    });
    fireEvent.change(screen.getByRole('combobox', { name: 'Card priority' }), {
      target: { value: 'urgent' },
    });
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      priority: 'urgent',
    });
  });

  it('toggles a checklist item in the modal', () => {
    renderBoard();
    fireEvent.click(screen.getByText('Write tests'));
    fireEvent.click(screen.getByRole('checkbox'));
    expect(jest.mocked(useData)().toggleChecklistItem).toHaveBeenCalledWith(
      'card-1',
      'cl-1'
    );
  });

  it('toggles a label in the modal', () => {
    renderBoard();
    fireEvent.click(screen.getByText('Write tests'));
    const labels = screen.getAllByText('Bug');
    fireEvent.click(labels[labels.length - 1]);
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      labels: [],
    });
  });

  it('deletes a card from the modal', async () => {
    renderBoard();
    fireEvent.click(screen.getByText('Write tests'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(jest.mocked(useData)().deleteCard).toHaveBeenCalledWith('card-1')
    );
    expect(screen.queryByDisplayValue('Write tests')).not.toBeInTheDocument();
  });

  it('redirects home when the board does not exist', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [{ ...baseData().boards[0], id: 'other' }],
    } as never);
    useSearchParams.mockReturnValue('missing');
    render(<BoardPage />);
    expect(push).toHaveBeenCalledWith('/');
  });

  it('filters cards by label and clears the filter', () => {
    renderBoard();
    fireEvent.click(screen.getAllByText('Bug')[0]);
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Overdue task')).not.toBeInTheDocument();
    expect(screen.getAllByText('No matches').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
  });

  it('filters cards by member', () => {
    renderBoard();
    fireEvent.click(screen.getByTitle('A'));
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Overdue task')).not.toBeInTheDocument();
  });

  it('filters cards by due date', () => {
    renderBoard();
    fireEvent.change(screen.getByLabelText('Due date filter'), {
      target: { value: 'overdue' },
    });
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
  });

  it('filters cards by priority', () => {
    renderBoard();
    fireEvent.change(screen.getByLabelText('Priority filter'), {
      target: { value: 'high' },
    });
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Overdue task')).not.toBeInTheDocument();
  });

  it('clears all filters at once', () => {
    renderBoard();
    fireEvent.click(screen.getByTitle('A'));
    fireEvent.change(screen.getByLabelText('Priority filter'), {
      target: { value: 'low' },
    });
    expect(screen.getAllByText('No matches').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
  });

  it('saves, applies, and deletes filter presets', () => {
    renderBoard();
    fireEvent.change(screen.getByLabelText('Priority filter'), {
      target: { value: 'high' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Save current filters…' })
    );
    fireEvent.change(screen.getByLabelText('Preset name'), {
      target: { value: 'High' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    fireEvent.click(screen.getByRole('button', { name: 'High' }));
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Overdue task')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Presets' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete preset High' }));
    expect(
      screen.queryByRole('button', { name: 'High' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('No saved presets')).toBeInTheDocument();
  });

  it('highlights matching search terms', () => {
    renderBoard();
    fireEvent.change(screen.getByLabelText('Search cards'), {
      target: { value: 'Overdue' },
    });
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
    const marks = screen
      .getAllByText('Overdue')
      .filter((el) => el.tagName === 'MARK');
    expect(marks).toHaveLength(1);
    expect(marks[0]).toHaveTextContent('Overdue');
  });

  it('sorts cards within a list', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Menu for To Do'));
    fireEvent.click(screen.getByRole('button', { name: 'name' }));
    const container = screen.getByText('To Do').closest('[data-list-id]')!;
    const titles = [...container.querySelectorAll('[draggable]')].map(
      (el) => el.textContent ?? ''
    );
    expect(titles[1]).toContain('Overdue task');
    expect(titles[2]).toContain('Write tests');
    expect(screen.getByText('by name')).toBeInTheDocument();
  });

  it('sorts cards by due date, priority, and creation time', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          dueDate: Date.now() + 1000,
          priority: 'low',
          createdAt: 100,
        },
        {
          ...baseData().cards[1],
          dueDate: null,
          priority: 'high',
          createdAt: 300,
        },
      ],
    } as never);
    renderBoard();
    const titles = () =>
      [
        ...screen
          .getByText('To Do')
          .closest('[data-list-id]')!
          .querySelectorAll('[draggable]'),
      ].map((el) => el.textContent ?? '');
    const sortBy = (mode: string) => {
      fireEvent.click(screen.getByLabelText('Menu for To Do'));
      fireEvent.click(screen.getByRole('button', { name: mode }));
    };
    sortBy('due');
    expect(titles()[1]).toContain('Write tests');
    expect(titles()[2]).toContain('Overdue task');
    sortBy('priority');
    expect(titles()[1]).toContain('Overdue task');
    expect(titles()[2]).toContain('Write tests');
    sortBy('created');
    expect(titles()[1]).toContain('Write tests');
    expect(titles()[2]).toContain('Overdue task');
  });

  it('shows a filled star for a starred board', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [{ ...baseData().boards[0], starred: true }],
    } as never);
    renderBoard();
    expect(screen.getByTestId('FiStar').className).toContain('fill-warning');
  });

  it('omits avatars for unknown members', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], memberIds: ['ghost'] }],
    } as never);
    renderBoard();
    expect(screen.getAllByText('A')).toHaveLength(1);
  });

  it('copies a list from the list menu', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Menu for To Do'));
    fireEvent.click(screen.getByRole('button', { name: 'Copy list' }));
    expect(jest.mocked(useData)().copyList).toHaveBeenCalledWith('list-1');
  });

  it('archives a list from the list menu', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Menu for To Do'));
    fireEvent.click(screen.getByRole('button', { name: 'Archive list' }));
    expect(jest.mocked(useData)().archiveList).toHaveBeenCalledWith('list-1');
  });

  it('archives a card from the card modal', () => {
    renderBoard();
    fireEvent.click(screen.getByText('Write tests'));
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(jest.mocked(useData)().archiveCard).toHaveBeenCalledWith('card-1');
    expect(screen.queryByDisplayValue('Write tests')).not.toBeInTheDocument();
  });

  it('shows an empty archive state', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Open archive'));
    expect(screen.getByText('Nothing archived.')).toBeInTheDocument();
  });

  it('lists and restores archived cards from the archive panel', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], archived: true }],
    } as never);
    renderBoard();
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Open archive'));
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Restore' }));
    expect(jest.mocked(useData)().restoreCard).toHaveBeenCalledWith('card-1');
  });

  it('restores archived lists from the archive panel', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      lists: [{ ...baseData().lists[1], archived: true, name: 'Done' }],
      cards: [{ ...baseData().cards[0], archived: true }],
    } as never);
    renderBoard();
    fireEvent.click(screen.getByLabelText('Open archive'));
    expect(screen.getByText('Lists')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Restore' })[0]);
    expect(jest.mocked(useData)().restoreList).toHaveBeenCalledWith('list-2');
  });

  it('deletes an archived card from the archive panel', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], archived: true }],
    } as never);
    renderBoard();
    fireEvent.click(screen.getByLabelText('Open archive'));
    fireEvent.click(screen.getByTestId('FiTrash2').closest('button')!);
    expect(jest.mocked(useData)().deleteCard).toHaveBeenCalledWith('card-1');
  });

  it('shows the activity feed for the board only', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Activity'));
    expect(
      screen.getByText('Alice Chen moved "Write tests" to Done')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Activity on another board')
    ).not.toBeInTheDocument();
  });

  it('exports activity as a CSV download', () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    const revokeObjectURL = jest.fn();
    global.URL.createObjectURL = createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURL;
    renderBoard();
    fireEvent.click(screen.getByLabelText('Activity'));
    fireEvent.click(screen.getByRole('button', { name: /Export/i }));
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });

  it('shows a due-date notification for assigned cards', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], dueDate: Date.now() - 1000 }],
    } as never);
    renderBoard();
    fireEvent.click(screen.getByLabelText('Notifications'));
    expect(screen.getByText(/"Write tests" is overdue/)).toBeInTheDocument();
  });

  it('marks notifications as read', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));
    expect(jest.mocked(useData)().updateSettings).toHaveBeenCalledWith({
      notificationsReadAt: expect.any(Number),
    });
  });

  it('adds a comment with a mention to a card', async () => {
    renderBoard();
    fireEvent.click(screen.getByText('Write tests'));
    fireEvent.change(screen.getByLabelText('Add comment'), {
      target: { value: 'LGTM @A' },
    });
    fireEvent.click(screen.getByTestId('FiSend').closest('button')!);
    const updateCard = jest.mocked(useData)().updateCard;
    expect(updateCard).toHaveBeenCalledWith('card-1', {
      comments: expect.arrayContaining([
        expect.objectContaining({ text: 'LGTM @A', author: 'Alice Chen' }),
      ]),
    });
    await waitFor(() => {
      expect(jest.mocked(useData)().addActivity).toHaveBeenCalledWith(
        'board-1',
        'card-1',
        expect.stringContaining('commented')
      );
    });
  });

  it('shares the board via a mock link', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Share board'));
    expect(
      screen.getByDisplayValue('https://projects.example.com/board/board-1')
    ).toBeInTheDocument();
  });

  it('changes a member role', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Board members'));
    fireEvent.change(screen.getByLabelText('Role for A'), {
      target: { value: 'viewer' },
    });
    expect(jest.mocked(useData)().updateBoard).toHaveBeenCalledWith('board-1', {
      roles: { 'mem-1': 'viewer' },
    });
  });

  it('hides editing controls for viewers', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [{ ...baseData().boards[0], roles: { 'mem-1': 'viewer' } }],
    } as never);
    renderBoard();
    expect(screen.queryByText('Add card')).not.toBeInTheDocument();
    expect(screen.queryByText('Add list')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Write tests'));
    expect(
      screen.queryByPlaceholderText('Write a comment...')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Archive')).not.toBeInTheDocument();
  });

  it('ignores shortcuts when a modifier key is pressed', () => {
    renderBoard();
    fireEvent.keyDown(window, { key: 'n', ctrlKey: true });
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
  });

  it('ignores the N shortcut when the board has no lists', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      lists: [],
    } as never);
    renderBoard();
    fireEvent.keyDown(window, { key: 'n' });
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
  });

  it('closes the list menu when toggled off', () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Menu for To Do'));
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Menu for To Do'));
    expect(screen.queryByText('Sort by')).not.toBeInTheDocument();
  });

  it('renders the expand icon for a collapsed list', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      lists: [{ ...baseData().lists[0], collapsed: true }],
    } as never);
    renderBoard();
    expect(screen.getByTestId('FiChevronRight')).toBeInTheDocument();
  });

  it('reports a copy failure when the clipboard is unavailable', async () => {
    renderBoard();
    fireEvent.click(screen.getByLabelText('Share board'));
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() =>
      expect(mockAddToast).toHaveBeenCalledWith('Could not copy link', 'error')
    );
  });

  it('copies the share link successfully', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    renderBoard();
    fireEvent.click(screen.getByLabelText('Share board'));
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() =>
      expect(mockAddToast).toHaveBeenCalledWith('Link copied', 'success')
    );
  });

  it('notifies when sharing is enabled', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [{ ...baseData().boards[0], shareEnabled: false }],
    } as never);
    renderBoard();
    fireEvent.click(screen.getByLabelText('Share board'));
    fireEvent.click(screen.getByLabelText('Anyone with the link can edit'));
    expect(mockAddToast).toHaveBeenCalledWith('Sharing enabled', 'info');
    expect(jest.mocked(useData)().updateBoard).toHaveBeenCalledWith('board-1', {
      shareEnabled: true,
    });
  });

  it('notifies when sharing is disabled', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [{ ...baseData().boards[0], shareEnabled: true }],
    } as never);
    renderBoard();
    fireEvent.click(screen.getByLabelText('Share board'));
    fireEvent.click(screen.getByLabelText('Anyone with the link can edit'));
    expect(mockAddToast).toHaveBeenCalledWith('Sharing disabled', 'info');
    expect(jest.mocked(useData)().updateBoard).toHaveBeenCalledWith('board-1', {
      shareEnabled: false,
    });
  });
});
