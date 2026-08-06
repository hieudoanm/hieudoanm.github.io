import { render, screen, fireEvent } from '@testing-library/react';
import TimelinePage from '@/app/board/timeline/page';
import { useData } from '@/providers/DataProvider';

const push = jest.fn();
const useSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({ get: useSearchParams }),
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="arrow-left" />,
}));

const baseData = () => ({
  boards: [
    {
      id: 'board-1',
      name: 'Alpha',
      background: '#3b82f6',
      starred: false,
      listIds: [],
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  lists: [],
  cards: [
    {
      id: 'card-1',
      listId: 'list-1',
      title: 'Launch',
      description: '',
      labels: [],
      dueDate: new Date(2026, 7, 10).getTime(),
      priority: 'medium',
      memberIds: [],
      checklistItems: [],
      commentCount: 0,
      coverColor: null,
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: 'card-2',
      listId: 'list-1',
      title: 'Archived',
      description: '',
      labels: [],
      dueDate: new Date(2026, 7, 12).getTime(),
      priority: 'medium',
      memberIds: [],
      checklistItems: [],
      commentCount: 0,
      coverColor: null,
      archived: true,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  isLoading: false,
});

describe('TimelinePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    useSearchParams.mockReset();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('shows loading when no board id is given', () => {
    useSearchParams.mockReturnValue(null);
    render(<TimelinePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders dated cards as timeline bars in sorted order', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 7, 5));
    useSearchParams.mockReturnValue('board-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        { ...baseData().cards[0], dueDate: new Date(2026, 7, 12).getTime() },
        {
          ...baseData().cards[0],
          id: 'card-2',
          title: 'Earlier',
          dueDate: new Date(2026, 7, 8).getTime(),
        },
        {
          ...baseData().cards[0],
          id: 'card-3',
          title: 'Later',
          dueDate: new Date(2026, 7, 15).getTime(),
        },
      ],
    } as never);
    render(<TimelinePage />);
    expect(screen.getByText('Alpha — Timeline')).toBeInTheDocument();
    const titles = screen
      .getAllByText(/Earlier|Later|Launch/)
      .map((n) => n.textContent);
    expect(titles).toEqual(['Earlier', 'Launch', 'Later']);
    jest.useRealTimers();
  });

  it('shows an empty state when there are no dated cards', () => {
    useSearchParams.mockReturnValue('board-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [],
    } as never);
    render(<TimelinePage />);
    expect(screen.getByText('No cards with due dates')).toBeInTheDocument();
  });

  it('navigates back to the board', () => {
    useSearchParams.mockReturnValue('board-1');
    render(<TimelinePage />);
    fireEvent.click(screen.getByTestId('arrow-left').closest('button')!);
    expect(push).toHaveBeenCalledWith('/board?id=board-1');
  });

  it('redirects home when the board does not exist', () => {
    useSearchParams.mockReturnValue('missing');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [{ ...baseData().boards[0], id: 'other' }],
    } as never);
    render(<TimelinePage />);
    expect(push).toHaveBeenCalledWith('/');
  });
});
