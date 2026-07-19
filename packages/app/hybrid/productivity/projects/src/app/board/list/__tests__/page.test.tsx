import { render, screen, fireEvent } from '@testing-library/react';
import ListPage from '@/app/board/list/page';
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

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="arrow-left" />,
  FiCalendar: () => <span data-testid="calendar" />,
}));

const baseData = () => ({
  boards: [
    {
      id: 'board-1',
      name: 'Alpha',
      background: '#3b82f6',
      starred: false,
      listIds: ['list-1'],
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  lists: [
    {
      id: 'list-1',
      boardId: 'board-1',
      name: 'To Do',
      cardIds: ['card-1'],
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
      dueDate: Date.now() + 86400000,
      priority: 'urgent',
      memberIds: ['mem-1'],
      checklistItems: [],
      comments: [],
      coverColor: null,
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  labels: [{ id: 'lbl-1', name: 'Bug', color: '#f00' }],
  members: [{ id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' }],
  isLoading: false,
});

describe('ListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    useSearchParams.mockReset();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('shows loading when no board id is given', () => {
    useSearchParams.mockReturnValue(null);
    render(<ListPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders a table of cards with details', () => {
    useSearchParams.mockReturnValue('board-1');
    render(<ListPage />);
    expect(screen.getByText('Alpha — List View')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Bug')).toBeInTheDocument();
    expect(screen.getByText('urgent')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders an em dash for cards without a due date', () => {
    useSearchParams.mockReturnValue('board-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], dueDate: null }],
    } as never);
    render(<ListPage />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('handles missing labels, members, and all priority levels', () => {
    useSearchParams.mockReturnValue('board-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      lists: [
        { ...baseData().lists[0], cardIds: ['card-1', 'card-2', 'card-3'] },
      ],
      cards: [
        {
          ...baseData().cards[0],
          labels: ['lbl-1', 'lbl-missing'],
          memberIds: ['mem-1', 'mem-missing'],
          priority: 'low',
        },
        {
          ...baseData().cards[0],
          id: 'card-2',
          title: 'Medium task',
          labels: [],
          memberIds: [],
          priority: 'medium',
        },
      ],
    } as never);
    render(<ListPage />);
    expect(screen.getByText('Medium task')).toBeInTheDocument();
    expect(screen.getByText('low')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  it('links back to the kanban board', () => {
    useSearchParams.mockReturnValue('board-1');
    render(<ListPage />);
    expect(screen.getByRole('link', { name: 'Kanban' })).toHaveAttribute(
      'href',
      '/board?id=board-1'
    );
    fireEvent.click(screen.getByTestId('arrow-left').closest('button')!);
    expect(push).toHaveBeenCalledWith('/board?id=board-1');
  });

  it('redirects home when the board does not exist', () => {
    useSearchParams.mockReturnValue('missing');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [{ ...baseData().boards[0], id: 'other' }],
    } as never);
    render(<ListPage />);
    expect(push).toHaveBeenCalledWith('/');
  });
});
