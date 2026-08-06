import { render, screen, fireEvent } from '@testing-library/react';
import CalendarPage from '@/app/board/cal/page';
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
  FiChevronLeft: () => <span data-testid="chevron-left" />,
  FiChevronRight: () => <span data-testid="chevron-right" />,
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
      title: 'Sprint review',
      description: '',
      labels: [],
      dueDate: new Date(2026, 7, 10).getTime(),
      priority: 'medium',
      memberIds: [],
      checklistItems: [],
      commentCount: 0,
      coverColor: '#22c55e',
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: 'card-2',
      listId: 'list-1',
      title: 'Archived task',
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

describe('CalendarPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    useSearchParams.mockReset();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('shows loading when no board id is given', () => {
    useSearchParams.mockReturnValue(null);
    render(<CalendarPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the month grid with dated cards', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 7, 5));
    useSearchParams.mockReturnValue('board-1');
    render(<CalendarPage />);
    expect(screen.getByText('Alpha — Calendar')).toBeInTheDocument();
    expect(screen.getByText('Sprint review')).toBeInTheDocument();
    expect(screen.queryByText('Archived task')).not.toBeInTheDocument();
    expect(screen.getAllByText(/2026/).length).toBeGreaterThan(0);
    jest.useRealTimers();
  });

  it('navigates between months', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 7, 5));
    useSearchParams.mockReturnValue('board-1');
    render(<CalendarPage />);
    const label = () => screen.getByText(/2026/).textContent ?? '';
    expect(label()).toBe('August 2026');
    fireEvent.click(screen.getByTestId('chevron-left').closest('button')!);
    expect(screen.getByText('July 2026')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('chevron-right').closest('button')!);
    fireEvent.click(screen.getByTestId('chevron-right').closest('button')!);
    expect(screen.getByText('September 2026')).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('navigates back to the board', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 7, 5));
    useSearchParams.mockReturnValue('board-1');
    render(<CalendarPage />);
    fireEvent.click(screen.getByTestId('arrow-left').closest('button')!);
    expect(push).toHaveBeenCalledWith('/board?id=board-1');
    jest.useRealTimers();
  });

  it('redirects home when the board does not exist', () => {
    useSearchParams.mockReturnValue('missing');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [{ ...baseData().boards[0], id: 'other' }],
    } as never);
    render(<CalendarPage />);
    expect(push).toHaveBeenCalledWith('/');
  });
});
