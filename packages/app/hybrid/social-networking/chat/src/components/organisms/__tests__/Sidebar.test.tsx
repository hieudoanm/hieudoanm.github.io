import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Sidebar } from '../Sidebar';
import type { Conversation } from '@/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/components/molecules/ConversationCard', () => ({
  ConversationCard: ({ conversation }: { conversation: Conversation }) => (
    <div data-testid="conversation-card">{conversation.title}</div>
  ),
}));

const { useRouter } = jest.requireMock('next/navigation');
const { useData } = jest.requireMock('@/providers/DataProvider');

const conversation = (
  id: string,
  overrides: Partial<Conversation> = {}
): Conversation => ({
  id,
  title: `Conv ${id}`,
  model: 'gpt-4o',
  createdAt: 1000,
  updatedAt: 2000,
  pinned: false,
  archived: false,
  ...overrides,
});

describe('Sidebar', () => {
  const push = jest.fn();
  const createConversation = jest.fn();
  const createFolder = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push });
    useData.mockReturnValue({
      conversations: [
        conversation('pinned-1', { pinned: true }),
        conversation('active-1'),
        conversation('archived-1', { archived: true }),
      ],
      createConversation,
      folders: [{ id: 'f1', name: 'Work', createdAt: 1000 }],
      createFolder,
    });
  });

  it('renders conversations grouped by pin status', () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    expect(screen.getByText('Pinned')).toBeInTheDocument();
    expect(screen.getByText('Recent')).toBeInTheDocument();
    expect(screen.getAllByTestId('conversation-card')).toHaveLength(2);
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('shows no Recent heading when nothing is unpinned', () => {
    useData.mockReturnValue({
      conversations: [conversation('pinned-1', { pinned: true })],
      createConversation,
      folders: [],
      createFolder,
    });
    render(<Sidebar isOpen={true} onClose={onClose} />);
    expect(screen.queryByText('Recent')).toBeNull();
  });

  it('filters conversations by title', () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    fireEvent.change(screen.getByPlaceholderText('Search conversations...'), {
      target: { value: 'active' },
    });
    expect(screen.getAllByTestId('conversation-card')).toHaveLength(1);
    expect(screen.getByText('Conv active-1')).toBeInTheDocument();
  });

  it('filters conversations by model', () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    fireEvent.change(screen.getByPlaceholderText('Search conversations...'), {
      target: { value: 'GPT-4O' },
    });
    expect(screen.getAllByTestId('conversation-card')).toHaveLength(2);
  });

  it('shows archived conversations when the archived filter is active', () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('Archived'));
    expect(screen.getByText('Conv archived-1')).toBeInTheDocument();
    expect(screen.queryByText('Conv active-1')).toBeNull();
  });

  it('switches back to active conversations', () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('Archived'));
    fireEvent.click(screen.getByText('Active'));
    expect(screen.getByText('Conv active-1')).toBeInTheDocument();
    expect(screen.queryByText('Conv archived-1')).toBeNull();
  });

  it('shows an empty state when no conversations match', () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    fireEvent.change(screen.getByPlaceholderText('Search conversations...'), {
      target: { value: 'nothing matches' },
    });
    expect(screen.getByText('No conversations found')).toBeInTheDocument();
  });

  it('creates a new chat and navigates to it', async () => {
    createConversation.mockResolvedValue({ id: 'new-chat' });
    render(<Sidebar isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('New Chat'));
    await waitFor(() => expect(createConversation).toHaveBeenCalled());
    expect(push).toHaveBeenCalledWith('/chat?id=new-chat');
    expect(onClose).toHaveBeenCalled();
  });

  it('creates a folder with a name', async () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    const input = screen.getByPlaceholderText('New folder...');
    fireEvent.change(input, { target: { value: 'Research' } });
    fireEvent.click(screen.getByText('Add'));
    await waitFor(() => expect(createFolder).toHaveBeenCalledWith('Research'));
  });

  it('creates a folder on Enter', async () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    const input = screen.getByPlaceholderText('New folder...');
    fireEvent.change(input, { target: { value: 'Personal' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(createFolder).toHaveBeenCalledWith('Personal'));
  });

  it('does not create a folder when the name is blank', () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('Add'));
    expect(createFolder).not.toHaveBeenCalled();
  });

  it('renders an overlay and close button when open', () => {
    render(<Sidebar isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(onClose).toHaveBeenCalled();
  });
});
