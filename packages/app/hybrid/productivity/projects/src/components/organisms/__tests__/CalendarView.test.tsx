import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarView } from '@/components/organisms/CalendarView';
import { useData } from '@/providers/DataProvider';

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
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
      cardIds: ['card-1', 'card-2'],
      collapsed: false,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
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
      comments: [],
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
      comments: [],
      coverColor: null,
      archived: true,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  isLoading: false,
  updateCard: jest.fn().mockResolvedValue(undefined),
});

describe('CalendarView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('renders the month grid with dated cards', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 7, 5));
    render(<CalendarView boardId="board-1" />);
    expect(screen.getByText('Sprint review')).toBeInTheDocument();
    expect(screen.queryByText('Archived task')).not.toBeInTheDocument();
    expect(screen.getAllByText(/2026/).length).toBeGreaterThan(0);
    jest.useRealTimers();
  });

  it('navigates between months', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 7, 5));
    render(<CalendarView boardId="board-1" />);
    expect(screen.getByText('August 2026')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('chevron-left').closest('button')!);
    expect(screen.getByText('July 2026')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('chevron-right').closest('button')!);
    fireEvent.click(screen.getByTestId('chevron-right').closest('button')!);
    expect(screen.getByText('September 2026')).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('reschedules a card by dragging it to another day', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 7, 5));
    render(<CalendarView boardId="board-1" />);
    fireEvent.dragStart(screen.getByText('Sprint review'));
    fireEvent.dragOver(screen.getByText('20'));
    fireEvent.drop(screen.getByText('20'));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      dueDate: new Date(2026, 7, 20).getTime(),
    });
    jest.useRealTimers();
  });

  it('does not scope cards from other boards', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 7, 5));
    render(<CalendarView boardId="board-2" />);
    expect(screen.queryByText('Sprint review')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
