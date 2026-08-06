import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BoardPage from '@/app/board/page';
import { useData } from '@/providers/DataProvider';

const push = jest.fn();
const useSearchParams = jest.fn();

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
  useToast: () => ({ addToast: jest.fn() }),
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
  ];
  const map: Record<string, () => React.ReactElement> = {};
  icons.forEach((name) => {
    map[name] = () => <span data-testid={name} />;
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
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: 'list-2',
      boardId: 'board-1',
      name: 'Done',
      cardIds: [],
      collapsed: false,
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
      commentCount: 2,
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
      commentCount: 0,
      coverColor: '#22c55e',
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  labels: [{ id: 'lbl-1', name: 'Bug', color: '#f00' }],
  members: [{ id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' }],
  createList: jest.fn().mockResolvedValue(undefined),
  updateList: jest.fn().mockResolvedValue(undefined),
  createCard: jest.fn().mockResolvedValue(undefined),
  moveCard: jest.fn().mockResolvedValue(undefined),
  deleteCard: jest.fn().mockResolvedValue(undefined),
  updateCard: jest.fn().mockResolvedValue(undefined),
  toggleChecklistItem: jest.fn().mockResolvedValue(undefined),
  addChecklistItem: jest.fn().mockResolvedValue(undefined),
  toggleStarBoard: jest.fn().mockResolvedValue(undefined),
  addActivity: jest.fn().mockResolvedValue(undefined),
  isLoading: false,
});

const renderBoard = () => {
  useSearchParams.mockReturnValue('board-1');
  return render(<BoardPage />);
};

describe('BoardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    useSearchParams.mockReset();
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
    expect(screen.getByText('Bug')).toBeInTheDocument();
    expect(screen.getByText('2 comments')).toBeInTheDocument();
    expect(
      screen
        .getByText('Write tests')
        .closest('[draggable]')!
        .textContent!.includes('0/1')
    ).toBe(true);
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
    fireEvent.click(listContainer.querySelector('button')!);
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
    fireEvent.change(screen.getByRole('combobox'), {
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
});
