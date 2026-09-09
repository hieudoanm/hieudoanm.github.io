import { render, screen } from '@testing-library/react';
import { ListView } from '@/components/organisms/ListView';
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

describe('ListView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('renders a table of cards with details', () => {
    render(<ListView boardId="board-1" />);
    expect(
      screen.getByRole('columnheader', { name: 'Title' })
    ).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Bug')).toBeInTheDocument();
    expect(screen.getByText('urgent')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders an em dash for cards without a due date', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], dueDate: null }],
    } as never);
    render(<ListView boardId="board-1" />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('handles missing labels, members, and all priority levels', () => {
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
    render(<ListView boardId="board-1" />);
    expect(screen.getByText('Medium task')).toBeInTheDocument();
    expect(screen.getByText('low')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  it('renders no rows when the board has no lists', () => {
    render(<ListView boardId="board-2" />);
    expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
  });
});
