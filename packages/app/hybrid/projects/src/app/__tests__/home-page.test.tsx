import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import { useData } from '@/providers/DataProvider';

const createBoard = jest.fn().mockResolvedValue(undefined);
const deleteBoard = jest.fn().mockResolvedValue(undefined);
const toggleStarBoard = jest.fn().mockResolvedValue(undefined);
const addToast = jest.fn();

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

jest.mock('react-icons/fi', () => ({
  FiPlus: () => <span data-testid="plus" />,
  FiStar: () => <span data-testid="star" />,
  FiTrash2: () => <span data-testid="trash" />,
  FiLayout: () => <span data-testid="layout" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast }),
}));

function mockBoard(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    name: id === 'board-1' ? 'Starred Board' : 'Other Board',
    background: '#3b82f6',
    starred: false,
    listIds: [],
    createdAt: Date.now() - 10000,
    updatedAt: Date.now() - 10000,
    ...overrides,
  };
}

const baseData = () => ({
  boards: [
    mockBoard('board-1', { starred: true }),
    mockBoard('board-2', { name: 'Other Board' }),
  ],
  lists: [
    { id: 'list-1', boardId: 'board-1', cardIds: ['card-1'] },
    { id: 'list-2', boardId: 'board-2', cardIds: [] },
  ],
  cards: [{ id: 'card-1', listId: 'list-1' }],
  isLoading: false,
  createBoard,
  deleteBoard,
  toggleStarBoard,
});

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useData).mockReturnValue(baseData() as never);
  });

  it('renders loading skeletons while loading', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [],
      lists: [],
      cards: [],
      isLoading: true,
    } as never);
    render(<HomePage />);
    expect(document.querySelectorAll('.skeleton')).toHaveLength(3);
  });

  it('renders starred and all boards sections with counts', () => {
    render(<HomePage />);
    expect(screen.getByText('Starred')).toBeInTheDocument();
    expect(screen.getByText('Starred Board')).toBeInTheDocument();
    expect(screen.getByText('All Boards')).toBeInTheDocument();
    expect(screen.getByText('Other Board')).toBeInTheDocument();
    expect(screen.getByText('1 lists · 1 cards')).toBeInTheDocument();
    expect(
      screen.getByText('1 lists · 0 cards · just now')
    ).toBeInTheDocument();
  });

  it('links boards to the board page', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /Starred Board/ })).toHaveAttribute(
      'href',
      '/board?id=board-1'
    );
  });

  it('shows the empty state', () => {
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      boards: [],
      lists: [],
      cards: [],
      isLoading: false,
    } as never);
    render(<HomePage />);
    expect(screen.getByText('No boards yet. Create one!')).toBeInTheDocument();
  });

  it('opens and cancels the create modal', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'New Board' }));
    expect(
      screen.getByRole('heading', { name: 'New Board' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Board name')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByPlaceholderText('Board name')).not.toBeInTheDocument();
  });

  it('creates a board with a name and background', async () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'New Board' }));
    fireEvent.change(screen.getByPlaceholderText('Board name'), {
      target: { value: 'My Board' },
    });
    const swatches = screen
      .getAllByRole('button')
      .filter(
        (b) =>
          (b as HTMLButtonElement).style.backgroundColor === 'rgb(34, 197, 94)'
      );
    fireEvent.click(swatches[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(createBoard).toHaveBeenCalledWith('My Board', '#22c55e')
    );
    expect(addToast).toHaveBeenCalledWith('Board created', 'success');
  });

  it('creates a board from a template', async () => {
    const createBoardFromTemplate = jest.fn().mockResolvedValue(undefined);
    jest.mocked(useData).mockReturnValue({
      ...baseData(),
      createBoardFromTemplate,
    } as never);
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'New Board' }));
    fireEvent.change(screen.getByPlaceholderText('Board name'), {
      target: { value: 'Roadmap' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Product Roadmap/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(createBoardFromTemplate).toHaveBeenCalledWith(
        'Roadmap',
        '#3b82f6',
        'tpl-roadmap'
      )
    );
    expect(addToast).toHaveBeenCalledWith('Board created', 'success');
  });

  it('does not create a board with an empty name', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'New Board' }));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    expect(createBoard).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText('Board name')).toBeInTheDocument();
  });

  it('toggles a board star', () => {
    render(<HomePage />);
    const otherSection = screen.getByText('All Boards');
    const stars = otherSection
      .closest('section')!
      .querySelectorAll('[data-testid="star"]');
    fireEvent.click(stars[0].closest('button')!);
    expect(toggleStarBoard).toHaveBeenCalledWith('board-2');
  });

  it('deletes a board with a toast', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByTestId('trash').closest('button')!);
    expect(deleteBoard).toHaveBeenCalledWith('board-2');
    expect(addToast).toHaveBeenCalledWith('Board deleted', 'info');
  });

  it('opens the create modal with the N shortcut', () => {
    render(<HomePage />);
    fireEvent.keyDown(window, { key: 'n' });
    expect(screen.getByPlaceholderText('Board name')).toBeInTheDocument();
  });

  it('types into the board name without triggering the shortcut', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('button', { name: 'New Board' }));
    const input = screen.getByPlaceholderText('Board name');
    fireEvent.change(input, { target: { value: 'n' } });
    fireEvent.keyDown(input, { key: 'n' });
    expect(input).toHaveValue('n');
  });
});
