import { render, screen } from '@testing-library/react';
import { TimelineView } from '@/components/organisms/TimelineView';
import { useData } from '@/providers/DataProvider';

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
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
      cardIds: ['card-1', 'card-2', 'card-3'],
      collapsed: false,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
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
      comments: [],
      coverColor: null,
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: 'card-2',
      listId: 'list-1',
      title: 'Earlier',
      description: '',
      labels: [],
      dueDate: new Date(2026, 7, 8).getTime(),
      priority: 'medium',
      memberIds: [],
      checklistItems: [],
      comments: [],
      coverColor: null,
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: 'card-3',
      listId: 'list-1',
      title: 'Later',
      description: '',
      labels: [],
      dueDate: new Date(2026, 7, 15).getTime(),
      priority: 'medium',
      memberIds: [],
      checklistItems: [],
      comments: [],
      coverColor: null,
      archived: false,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  isLoading: false,
});

describe('TimelineView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('renders dated cards as timeline bars in sorted order', () => {
    render(<TimelineView boardId="board-1" />);
    const titles = screen
      .getAllByText(/Earlier|Later|Launch/)
      .map((n) => n.textContent);
    expect(titles).toEqual(['Earlier', 'Launch', 'Later']);
  });

  it('shows an empty state when there are no dated cards', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [],
    } as never);
    render(<TimelineView boardId="board-1" />);
    expect(screen.getByText('No cards with due dates')).toBeInTheDocument();
  });

  it('does not scope cards from other boards', () => {
    render(<TimelineView boardId="board-2" />);
    expect(screen.queryByText('Launch')).not.toBeInTheDocument();
  });
});
