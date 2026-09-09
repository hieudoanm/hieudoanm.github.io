import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '@/app/page';
import { useData } from '@/providers/DataProvider';

const push = jest.fn();
const useSearchParams = jest.fn();
const usePathname = jest.fn(() => '/');
const mockAddToast = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => usePathname(),
  useSearchParams: () => ({ get: useSearchParams }),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
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

const mockUseAuth = jest.fn();

jest.mock('@/providers/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('react-icons/fi', () => {
  const icons = [
    'FiPlus',
    'FiMoreHorizontal',
    'FiStar',
    'FiX',
    'FiCheck',
    'FiCalendar',
    'FiTrash2',
    'FiChevronDown',
    'FiChevronLeft',
    'FiChevronRight',
    'FiSearch',
    'FiArchive',
    'FiCopy',
    'FiRotateCcw',
    'FiSend',
    'FiBookmark',
    'FiLayout',
    'FiChevronsLeft',
    'FiChevronsRight',
    'FiUser',
    'FiCheck',
    'FiLogOut',
  ];
  const map: Record<string, React.FC<Record<string, unknown>>> = {};
  icons.forEach((name) => {
    map[name] = (props: Record<string, unknown>) => (
      <span data-testid={name} {...props} />
    );
  });
  return map;
});

const mockBoard = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  name: id === 'board-1' ? 'Alpha' : 'Beta',
  background: '#3b82f6',
  starred: false,
  listIds: id === 'board-1' ? ['list-1', 'list-2'] : [],
  ...overrides,
});

const baseData = () => ({
  boards: [mockBoard('board-1'), mockBoard('board-2')],
  lists: [
    {
      id: 'list-1',
      boardId: 'board-1',
      name: 'To Do',
      cardIds: ['card-1', 'card-2'],
      collapsed: false,
      archived: false,
    },
    {
      id: 'list-2',
      boardId: 'board-1',
      name: 'Done',
      cardIds: [],
      collapsed: false,
      archived: false,
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
    },
  ],
  labels: [{ id: 'lbl-1', name: 'Bug', color: '#f00' }],
  members: [{ id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' }],
  activity: [],
  tasks: [],
  settings: {
    theme: 'projects-light',
    defaultView: 'kanban',
    notifications: true,
  },
  createBoard: jest.fn().mockResolvedValue({ id: 'new' }),
  createBoardFromTemplate: jest.fn().mockResolvedValue({ id: 'new' }),
  createList: jest.fn().mockResolvedValue({ id: 'list-new', name: 'New list' }),
  updateList: jest.fn().mockResolvedValue(undefined),
  moveList: jest.fn().mockResolvedValue(undefined),
  createCard: jest
    .fn()
    .mockResolvedValue({ id: 'card-new', title: 'New card' }),
  moveCard: jest.fn().mockResolvedValue(undefined),
  deleteCard: jest.fn().mockResolvedValue(undefined),
  updateCard: jest.fn().mockResolvedValue(undefined),
  addTask: jest.fn().mockResolvedValue(undefined),
  toggleTask: jest.fn().mockResolvedValue(undefined),
  deleteTask: jest.fn().mockResolvedValue(undefined),
  updateBoard: jest.fn().mockResolvedValue(undefined),
  toggleChecklistItem: jest.fn().mockResolvedValue(undefined),
  addChecklistItem: jest.fn().mockResolvedValue(undefined),
  toggleStarBoard: jest.fn().mockResolvedValue(undefined),
  addActivity: jest.fn().mockResolvedValue(undefined),
  deleteBoard: jest.fn().mockResolvedValue(undefined),
  updateSettings: jest.fn().mockResolvedValue(undefined),
  archiveList: jest.fn().mockResolvedValue(undefined),
  restoreList: jest.fn().mockResolvedValue(undefined),
  copyList: jest.fn().mockResolvedValue(undefined),
  archiveCard: jest.fn().mockResolvedValue(undefined),
  restoreCard: jest.fn().mockResolvedValue(undefined),
  isLoading: false,
});

const renderHome = () => {
  useSearchParams.mockReturnValue('board-1');
  return render(<HomePage />);
};

describe('HomePage (board + sidebar shell)', () => {
  beforeAll(() => {
    document.elementFromPoint =
      jest.fn() as unknown as typeof document.elementFromPoint;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    useSearchParams.mockReset();
    usePathname.mockReturnValue('/');
    localStorage.clear();
    mockUseAuth.mockReturnValue({
      currentUser: null,
      switchMember: jest.fn(),
      signOut: jest.fn(),
    });
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('renders the sidebar with project links and defaults to the first board', () => {
    useSearchParams.mockReturnValue(null);
    render(<HomePage />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0);
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('renders the board header, lists, and cards for the active id', () => {
    renderHome();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
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
    renderHome();
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
    render(<HomePage />);
    expect(screen.getByText('Due soon')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('highlights the active project in the sidebar', () => {
    renderHome();
    expect(
      screen
        .getByRole('link', { name: /Alpha/ })
        .querySelector('.font-semibold')
    ).toBeInTheDocument();
  });

  it('links projects to the root board view', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /Beta/ })).toHaveAttribute(
      'href',
      '/?id=board-2'
    );
  });

  it('collapses and re-expands the sidebar', async () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Collapse sidebar'));
    expect(screen.queryByText('Projects')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Expand sidebar')).toBeInTheDocument();
    expect(screen.queryByLabelText('Search cards')).not.toBeInTheDocument();
    await userEvent.click(screen.getByLabelText('Expand sidebar'));
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByLabelText('Search cards')).toBeInTheDocument();
    });
  });

  it('toggles the board star', () => {
    renderHome();
    fireEvent.click(screen.getByTestId('FiStar').closest('button')!);
    expect(jest.mocked(useData)().toggleStarBoard).toHaveBeenCalledWith(
      'board-1'
    );
  });

  it('shows an empty state when there are no projects', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [],
      lists: [],
      cards: [],
      isLoading: false,
    } as never);
    render(<HomePage />);
    expect(
      screen.getByText('No projects yet. Create one from the sidebar.')
    ).toBeInTheDocument();
  });

  it('opens and cancels the create project modal', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Add project'));
    expect(
      screen.getByRole('heading', { name: 'New Board' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Board name')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByPlaceholderText('Board name')).not.toBeInTheDocument();
  });

  it('creates a board from the sidebar', async () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Add project'));
    fireEvent.change(screen.getByPlaceholderText('Board name'), {
      target: { value: 'My Board' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(jest.mocked(useData)().createBoard).toHaveBeenCalledWith(
        'My Board',
        '#3b82f6'
      )
    );
    expect(mockAddToast).toHaveBeenCalledWith('Board created', 'success');
  });

  it('creates a board from a template', async () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Add project'));
    fireEvent.change(screen.getByPlaceholderText('Board name'), {
      target: { value: 'Roadmap' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Product Roadmap/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(
        jest.mocked(useData)().createBoardFromTemplate
      ).toHaveBeenCalledWith('Roadmap', '#3b82f6', 'tpl-roadmap')
    );
  });

  it('deletes a project from the sidebar', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Delete Beta'));
    expect(jest.mocked(useData)().deleteBoard).toHaveBeenCalledWith('board-2');
    expect(mockAddToast).toHaveBeenCalledWith('Board deleted', 'info');
  });

  it('does not create a board with an empty name', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Add project'));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(jest.mocked(useData)().createBoard).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText('Board name')).toBeInTheDocument();
  });

  it('adds a card via the check button', async () => {
    renderHome();
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
    renderHome();
    fireEvent.click(screen.getAllByRole('button', { name: 'Add card' })[0]);
    fireEvent.change(screen.getByPlaceholderText('Card title'), {
      target: { value: 'Nope' },
    });
    fireEvent.click(screen.getByTestId('FiX').closest('button')!);
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
  });

  it('cancels creating a list via the Cancel button', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: 'Add list' }));
    fireEvent.change(screen.getByPlaceholderText('List name'), {
      target: { value: 'Nope' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByPlaceholderText('List name')).not.toBeInTheDocument();
  });

  it('closes the card modal', () => {
    renderHome();
    fireEvent.click(screen.getByText('Write tests'));
    expect(screen.getByDisplayValue('Write tests')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('FiX').closest('button')!);
    expect(screen.queryByDisplayValue('Write tests')).not.toBeInTheDocument();
  });

  it('creates a list', async () => {
    renderHome();
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
    renderHome();
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
    renderHome();
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
    renderHome();
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
    renderHome();
    const listContainer =
      screen.getByText('To Do').parentElement!.parentElement!;
    fireEvent.click(listContainer.querySelectorAll('button')[1]!);
    expect(jest.mocked(useData)().updateList).toHaveBeenCalledWith('list-1', {
      collapsed: true,
    });
  });

  it('moves a card to another list via drag and drop', async () => {
    renderHome();
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
    renderHome();
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
    renderHome();
    fireEvent.change(screen.getByLabelText('Search cards'), {
      target: { value: 'overdue' },
    });
    const marks = screen
      .getAllByText('Overdue')
      .filter((el) => el.tagName === 'MARK');
    expect(marks).toHaveLength(1);
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
  });

  it('shows a drop placeholder when dragging a card over a list', () => {
    renderHome();
    const cardEl = screen.getByText('Write tests').closest('[draggable]')!;
    const destList = screen.getByText('Done').parentElement!.parentElement!;
    fireEvent.dragStart(cardEl);
    fireEvent.dragOver(destList);
    expect(screen.getByText('Drop here')).toBeInTheDocument();
  });

  it('focuses search with the Q and F shortcuts', () => {
    renderHome();
    const search = screen.getByLabelText('Search cards');
    fireEvent.keyDown(window, { key: 'q' });
    expect(search).toHaveFocus();
    fireEvent.keyDown(window, { key: 'f' });
    expect(search).toHaveFocus();
  });

  it('opens add card with the N shortcut', () => {
    renderHome();
    fireEvent.keyDown(window, { key: 'n' });
    expect(screen.getByPlaceholderText('Card title')).toBeInTheDocument();
  });

  it('ignores shortcuts while typing in an input', () => {
    renderHome();
    fireEvent.keyDown(screen.getByLabelText('Search cards'), { key: 'n' });
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
  });

  it('moves a card via long-press touch drag', async () => {
    jest.useFakeTimers();
    try {
      renderHome();
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
      renderHome();
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
      renderHome();
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
      renderHome();
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
    renderHome();
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
    renderHome();
    fireEvent.click(screen.getByText('Write tests'));
    fireEvent.click(screen.getByRole('checkbox'));
    expect(jest.mocked(useData)().toggleChecklistItem).toHaveBeenCalledWith(
      'card-1',
      'cl-1'
    );
  });

  it('toggles a label in the modal', () => {
    renderHome();
    fireEvent.click(screen.getByText('Write tests'));
    const labels = screen.getAllByText('Bug');
    fireEvent.click(labels[labels.length - 1]);
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      labels: [],
    });
  });

  it('deletes a card from the modal', async () => {
    renderHome();
    fireEvent.click(screen.getByText('Write tests'));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(jest.mocked(useData)().deleteCard).toHaveBeenCalledWith('card-1')
    );
    expect(screen.queryByDisplayValue('Write tests')).not.toBeInTheDocument();
  });

  it('falls back to the first board when the requested id is missing', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [mockBoard('board-1'), mockBoard('board-2')],
    } as never);
    useSearchParams.mockReturnValue('missing');
    render(<HomePage />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('filters cards by label and clears the filter', () => {
    renderHome();
    fireEvent.click(screen.getAllByText('Bug')[0]);
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Overdue task')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
  });

  it('filters cards by member', () => {
    renderHome();
    fireEvent.click(screen.getByTitle('A'));
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Overdue task')).not.toBeInTheDocument();
  });

  it('filters cards by due date', () => {
    renderHome();
    fireEvent.change(screen.getByLabelText('Due date filter'), {
      target: { value: 'overdue' },
    });
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
  });

  it('filters cards by priority', () => {
    renderHome();
    fireEvent.change(screen.getByLabelText('Priority filter'), {
      target: { value: 'high' },
    });
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.queryByText('Overdue task')).not.toBeInTheDocument();
  });

  it('clears all filters at once', () => {
    renderHome();
    fireEvent.click(screen.getByTitle('A'));
    fireEvent.change(screen.getByLabelText('Priority filter'), {
      target: { value: 'low' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
  });

  it('saves, applies, and deletes filter presets', () => {
    renderHome();
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
    renderHome();
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
    renderHome();
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

  it('shows a filled star for a starred board', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [
        { ...mockBoard('board-1'), starred: true },
        mockBoard('board-2'),
      ],
    } as never);
    renderHome();
    expect(screen.getByTestId('FiStar').className).toContain('fill-warning');
  });

  it('omits avatars for unknown members', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], memberIds: ['ghost'] }],
    } as never);
    renderHome();
    expect(screen.getAllByText('A')).toHaveLength(1);
  });

  it('copies a list from the list menu', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Menu for To Do'));
    fireEvent.click(screen.getByRole('button', { name: 'Copy list' }));
    expect(jest.mocked(useData)().copyList).toHaveBeenCalledWith('list-1');
  });

  it('archives a list from the list menu', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Menu for To Do'));
    fireEvent.click(screen.getByRole('button', { name: 'Archive list' }));
    expect(jest.mocked(useData)().archiveList).toHaveBeenCalledWith('list-1');
  });

  it('archives a card from the card modal', () => {
    renderHome();
    fireEvent.click(screen.getByText('Write tests'));
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(jest.mocked(useData)().archiveCard).toHaveBeenCalledWith('card-1');
    expect(screen.queryByDisplayValue('Write tests')).not.toBeInTheDocument();
  });

  it('shows an empty archive state', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Open archive'));
    expect(screen.getByText('Nothing archived.')).toBeInTheDocument();
  });

  it('lists and restores archived cards from the archive panel', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], archived: true }],
    } as never);
    renderHome();
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
    renderHome();
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
    renderHome();
    fireEvent.click(screen.getByLabelText('Open archive'));
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete archived card' })
    );
    expect(jest.mocked(useData)().deleteCard).toHaveBeenCalledWith('card-1');
  });

  it('adds a comment with a mention to a card', async () => {
    renderHome();
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
  });

  it('hides editing controls for viewers', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [
        { ...mockBoard('board-1'), roles: { 'mem-1': 'viewer' } },
        mockBoard('board-2'),
      ],
    } as never);
    renderHome();
    expect(screen.queryByText('Add card')).not.toBeInTheDocument();
    expect(screen.queryByText('Add list')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Write tests'));
    expect(
      screen.queryByPlaceholderText('Write a comment...')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Archive')).not.toBeInTheDocument();
  });

  it('ignores shortcuts when a modifier key is pressed', () => {
    renderHome();
    fireEvent.keyDown(window, { key: 'n', ctrlKey: true });
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
  });

  it('ignores the N shortcut when the board has no lists', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      lists: [],
    } as never);
    renderHome();
    fireEvent.keyDown(window, { key: 'n' });
    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument();
  });

  it('closes the list menu when toggled off', () => {
    renderHome();
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
    renderHome();
    expect(screen.getByTestId('FiChevronRight')).toBeInTheDocument();
  });
});

describe('HomePage view routing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    useSearchParams.mockReset();
    usePathname.mockReturnValue('/');
    mockUseAuth.mockReturnValue({
      currentUser: null,
      switchMember: jest.fn(),
      signOut: jest.fn(),
    });
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('renders the view switcher above the kanban board by default', () => {
    renderHome();
    for (const label of ['Kanban', 'List', 'Calendar', 'Timeline', 'Tasks']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Kanban' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('switches to the list view', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: 'List' }));
    expect(
      screen.getByRole('columnheader', { name: 'Title' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getAllByText('Write tests').length).toBeGreaterThan(0);
  });

  it('switches to the calendar view', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: 'Calendar' }));
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calendar' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.queryByText('To Do')).not.toBeInTheDocument();
  });

  it('switches to the timeline view', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: 'Timeline' }));
    expect(screen.getByRole('button', { name: 'Timeline' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByText('Overdue task')).toBeInTheDocument();
  });

  it('honors settings.defaultView for the initial view', () => {
    useSearchParams.mockReturnValue('board-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      settings: {
        theme: 'projects-light',
        defaultView: 'list',
        notifications: true,
      },
    } as never);
    render(<HomePage />);
    expect(
      screen.getByRole('columnheader', { name: 'Title' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('falls back to kanban for an unknown defaultView', () => {
    useSearchParams.mockReturnValue('board-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      settings: {
        theme: 'projects-light',
        defaultView: 'gantt',
        notifications: true,
      },
    } as never);
    render(<HomePage />);
    expect(screen.getByRole('button', { name: 'Kanban' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('switches to the tasks view but shows nothing when signed out', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: 'Tasks' }));
    expect(screen.getByRole('button', { name: 'Tasks' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.queryByLabelText('New task')).not.toBeInTheDocument();
    expect(screen.queryByText('No tasks yet.')).not.toBeInTheDocument();
  });

  it('switches to the tasks view and shows the signed-in user tasks', () => {
    const toggleTask = jest.fn().mockResolvedValue(undefined);
    const deleteTask = jest.fn().mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue({
      currentUser: {
        id: 'mem-1',
        name: 'Alice',
        email: 'a@x.com',
        avatar: 'A',
      },
      switchMember: jest.fn(),
      signOut: jest.fn(),
    });
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      tasks: [
        {
          id: 'task-1',
          userId: 'mem-1',
          text: 'Ship it',
          completed: false,
          createdAt: 1,
          updatedAt: 2,
        },
        {
          id: 'task-2',
          userId: 'mem-2',
          text: 'Private task',
          completed: false,
          createdAt: 1,
          updatedAt: 2,
        },
      ],
      toggleTask,
      deleteTask,
    } as never);
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: 'Tasks' }));
    expect(screen.getByLabelText('New task')).toBeInTheDocument();
    expect(screen.getByText('Ship it')).toBeInTheDocument();
    expect(screen.queryByText('Private task')).not.toBeInTheDocument();
    expect(screen.getByText('1 pending · 1 total')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Toggle Ship it'));
    expect(toggleTask).toHaveBeenCalledWith('task-1');
    fireEvent.click(screen.getByLabelText('Delete Ship it'));
    expect(deleteTask).toHaveBeenCalledWith('task-1');
  });
});
