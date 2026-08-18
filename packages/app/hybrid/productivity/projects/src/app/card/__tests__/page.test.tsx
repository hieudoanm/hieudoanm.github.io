import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CardDetailPage from '@/app/card/page';
import { useData } from '@/providers/DataProvider';

const push = jest.fn();
const back = jest.fn();
const useSearchParams = jest.fn();
const addToast = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push, back }),
  useSearchParams: () => ({ get: useSearchParams }),
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast }),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="arrow-left" />,
  FiX: () => <span data-testid="x" />,
  FiCheck: () => <span data-testid="check" />,
  FiCalendar: () => <span data-testid="calendar" />,
  FiTrash2: () => <span data-testid="trash" />,
  FiPaperclip: () => <span data-testid="paperclip" />,
  FiArchive: () => <span data-testid="archive" />,
}));

const baseData = () => ({
  cards: [
    {
      id: 'card-1',
      listId: 'list-1',
      title: 'Write tests',
      description: 'Keep going',
      labels: ['lbl-1'],
      dueDate: Date.now() + 86400000,
      priority: 'urgent',
      memberIds: ['mem-1'],
      checklistItems: [
        { id: 'cl-1', text: 'Login', checked: true },
        { id: 'cl-2', text: 'Logout', checked: false },
      ],
      comments: [],
      attachments: [],
      coverColor: null,
      coverImage: null,
      archived: false,
      createdAt: Date.now() - 60000,
      updatedAt: Date.now() - 60000,
    },
  ],
  lists: [{ id: 'list-1', name: 'To Do' }],
  labels: [{ id: 'lbl-1', name: 'Bug', color: '#f00' }],
  members: [{ id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' }],
  updateCard: jest.fn().mockResolvedValue(undefined),
  deleteCard: jest.fn().mockResolvedValue(undefined),
  archiveCard: jest.fn().mockResolvedValue(undefined),
  toggleChecklistItem: jest.fn().mockResolvedValue(undefined),
  addChecklistItem: jest.fn().mockResolvedValue(undefined),
  isLoading: false,
});

describe('CardDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    push.mockReset();
    back.mockReset();
    useSearchParams.mockReset();
    addToast.mockReset();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('shows loading when no card id is given', () => {
    useSearchParams.mockReturnValue(null);
    render(<CardDetailPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders card details, checklist, and progress', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Keep going')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('urgent')).toBeInTheDocument();
    expect(screen.getByText('Bug')).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('1m ago')).toBeInTheDocument();
  });

  it('renders fallbacks for cards without due date or checklist', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          dueDate: null,
          checklistItems: [],
          priority: 'low',
        },
      ],
    } as never);
    render(<CardDetailPage />);
    expect(screen.getByLabelText('Due date')).toHaveValue('');
    expect(screen.getByText('low')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('renders a medium priority badge', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          priority: 'medium',
          labels: [],
          memberIds: [],
        },
      ],
    } as never);
    render(<CardDetailPage />);
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  it('renders unselected labels and unassigned members dimmed', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      labels: [
        { id: 'lbl-1', name: 'Bug', color: '#f00' },
        { id: 'lbl-2', name: 'Feature', color: '#00f' },
      ],
      members: [
        { id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' },
        { id: 'mem-2', name: 'B', email: 'b@x.com', avatar: 'B' },
      ],
    } as never);
    render(<CardDetailPage />);
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('does not add an empty checklist item on Enter', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.keyDown(screen.getByPlaceholderText('Add item'), {
      key: 'Enter',
    });
    expect(jest.mocked(useData)().addChecklistItem).not.toHaveBeenCalled();
  });

  it('edits the description', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.change(screen.getByDisplayValue('Keep going'), {
      target: { value: 'Updated' },
    });
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      description: 'Updated',
    });
  });

  it('toggles a checklist item', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Logout' }));
    expect(jest.mocked(useData)().toggleChecklistItem).toHaveBeenCalledWith(
      'card-1',
      'cl-2'
    );
  });

  it('adds a checklist item on Enter', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.change(screen.getByPlaceholderText('Add item'), {
      target: { value: 'Sign up' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('Add item'), {
      key: 'Enter',
    });
    expect(jest.mocked(useData)().addChecklistItem).toHaveBeenCalledWith(
      'card-1',
      'Sign up'
    );
  });

  it('adds a checklist item via the button', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.change(screen.getByPlaceholderText('Add item'), {
      target: { value: 'Sign up' },
    });
    fireEvent.click(screen.getByTestId('check').closest('button')!);
    expect(jest.mocked(useData)().addChecklistItem).toHaveBeenCalledWith(
      'card-1',
      'Sign up'
    );
  });

  it('does not add an empty checklist item', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getByTestId('check').closest('button')!);
    expect(jest.mocked(useData)().addChecklistItem).not.toHaveBeenCalled();
  });

  it('toggles a label', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getByText('Bug'));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      labels: [],
    });
  });

  it('toggles a member', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getByText('A'));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      memberIds: [],
    });
  });

  it('deletes the card and navigates back', async () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(jest.mocked(useData)().deleteCard).toHaveBeenCalledWith('card-1')
    );
    expect(addToast).toHaveBeenCalledWith('Card deleted', 'info');
    expect(back).toHaveBeenCalled();
  });

  it('navigates back with the arrow', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getByTestId('arrow-left').closest('button')!);
    expect(back).toHaveBeenCalled();
  });

  it('redirects home when the card does not exist', () => {
    useSearchParams.mockReturnValue('missing');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], id: 'other' }],
    } as never);
    render(<CardDetailPage />);
    expect(push).toHaveBeenCalledWith('/');
  });

  it('does not redirect while still loading', () => {
    useSearchParams.mockReturnValue('missing');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [{ ...baseData().cards[0], id: 'other' }],
      isLoading: true,
    } as never);
    render(<CardDetailPage />);
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('does not redirect when the board is empty', () => {
    useSearchParams.mockReturnValue('missing');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [],
    } as never);
    render(<CardDetailPage />);
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('sets a due date from the picker', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.change(screen.getByLabelText('Due date'), {
      target: { value: '2026-03-15' },
    });
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      dueDate: new Date('2026-03-15T00:00:00').getTime(),
    });
  });

  it('clears the due date', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.change(screen.getByLabelText('Due date'), {
      target: { value: '' },
    });
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      dueDate: null,
    });
  });

  it('renders comments with timestamps and authors', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          comments: [
            {
              id: 'cmt-1',
              text: 'Looks good',
              author: 'Alice',
              createdAt: Date.now() - 120000,
            },
          ],
        },
      ],
    } as never);
    render(<CardDetailPage />);
    expect(screen.getByText('Looks good')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('2m ago')).toBeInTheDocument();
  });

  it('adds a comment via Enter', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.change(screen.getByLabelText('New comment'), {
      target: { value: 'Nice' },
    });
    fireEvent.keyDown(screen.getByLabelText('New comment'), {
      key: 'Enter',
    });
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith(
      'card-1',
      expect.objectContaining({
        comments: expect.arrayContaining([
          expect.objectContaining({ text: 'Nice', author: 'You' }),
        ]),
      })
    );
  });

  it('adds a comment via the button', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.change(screen.getByLabelText('New comment'), {
      target: { value: 'Nice' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Comment' }));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith(
      'card-1',
      expect.objectContaining({
        comments: expect.arrayContaining([
          expect.objectContaining({ text: 'Nice', author: 'You' }),
        ]),
      })
    );
  });

  it('does not add an empty comment', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Comment' }));
    expect(jest.mocked(useData)().updateCard).not.toHaveBeenCalled();
  });

  it('renders attachments and adds a mock attachment', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          attachments: [{ id: 'att-1', name: 'spec.pdf', size: 245760 }],
        },
      ],
    } as never);
    render(<CardDetailPage />);
    expect(screen.getByText('spec.pdf')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Add attachment/ }));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith(
      'card-1',
      expect.objectContaining({
        attachments: expect.arrayContaining([
          expect.objectContaining({ name: 'attachment-2.pdf' }),
        ]),
      })
    );
  });

  it('removes an attachment', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          attachments: [{ id: 'att-1', name: 'spec.pdf', size: 245760 }],
        },
      ],
    } as never);
    render(<CardDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove spec.pdf' }));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      attachments: [],
    });
  });

  it('sets a cover image', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getAllByRole('button', { name: /Set cover/ })[0]);
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith(
      'card-1',
      expect.objectContaining({ coverImage: expect.any(String) })
    );
  });

  it('removes the cover image', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          coverImage: 'https://picsum.photos/seed/cover/400/240',
        },
      ],
    } as never);
    render(<CardDetailPage />);
    expect(screen.getByAltText('Card cover')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remove cover' }));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      coverImage: null,
    });
  });

  it('highlights the selected cover image', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      cards: [
        {
          ...baseData().cards[0],
          coverImage: 'https://picsum.photos/seed/project-cover-1/400/240',
        },
      ],
    } as never);
    render(<CardDetailPage />);
    expect(screen.getByAltText('Card cover')).toBeInTheDocument();
  });

  it('adds an unselected label', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      labels: [
        { id: 'lbl-1', name: 'Bug', color: '#f00' },
        { id: 'lbl-2', name: 'Feature', color: '#00f' },
      ],
    } as never);
    render(<CardDetailPage />);
    fireEvent.click(screen.getByText('Feature'));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      labels: ['lbl-1', 'lbl-2'],
    });
  });

  it('assigns an unselected member', () => {
    useSearchParams.mockReturnValue('card-1');
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      members: [
        { id: 'mem-1', name: 'A', email: 'a@x.com', avatar: 'A' },
        { id: 'mem-2', name: 'B', email: 'b@x.com', avatar: 'B' },
      ],
    } as never);
    render(<CardDetailPage />);
    fireEvent.click(screen.getByText('B'));
    expect(jest.mocked(useData)().updateCard).toHaveBeenCalledWith('card-1', {
      memberIds: ['mem-1', 'mem-2'],
    });
  });

  it('archives the card and navigates back', () => {
    useSearchParams.mockReturnValue('card-1');
    render(<CardDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(jest.mocked(useData)().archiveCard).toHaveBeenCalledWith('card-1');
    expect(back).toHaveBeenCalled();
  });
});
