import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConversationCard } from '../ConversationCard';
import type { Conversation } from '@/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    onClick,
    children,
  }: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(() => ({ addToast: jest.fn() })),
}));

const { useData } = jest.requireMock('@/providers/DataProvider');
const { useToast } = jest.requireMock('@/providers/ToastProvider');
const addToast = jest.fn();

const conversation = (overrides: Partial<Conversation> = {}): Conversation => ({
  id: 'conv-1',
  title: 'My Chat',
  model: 'gpt-4o',
  createdAt: 1000,
  updatedAt: 2000,
  pinned: false,
  archived: false,
  ...overrides,
});

const data = {
  setCurrentConversation: jest.fn(),
  deleteConversation: jest.fn(),
  renameConversation: jest.fn(),
  togglePin: jest.fn(),
  toggleArchive: jest.fn(),
  duplicateConversation: jest.fn(),
};

describe('ConversationCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useData.mockReturnValue(data);
    useToast.mockReturnValue({ addToast });
  });

  it('renders title, preview, model, and time', () => {
    render(
      <ConversationCard
        conversation={conversation()}
        preview="A very long preview message"
      />
    );
    expect(screen.getByText('My Chat')).toBeInTheDocument();
    expect(screen.getByText('gpt-4o')).toBeInTheDocument();
    expect(screen.getByText(/A very long preview/)).toBeInTheDocument();
  });

  it('does not render a preview when none is provided', () => {
    render(<ConversationCard conversation={conversation()} />);
    expect(screen.queryByText(/preview/i)).toBeNull();
  });

  it('shows a pin icon for pinned conversations', () => {
    render(<ConversationCard conversation={conversation({ pinned: true })} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('sets the current conversation when clicked', () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.click(screen.getByText('My Chat'));
    expect(data.setCurrentConversation).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'conv-1' })
    );
  });

  it('toggles the menu and shows pin/archive/duplicate/delete actions', () => {
    render(<ConversationCard conversation={conversation()} />);
    expect(screen.queryByText('Duplicate')).toBeNull();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Pin')).toBeInTheDocument();
    expect(screen.getByText('Archive')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows Unpin and Unarchive for pinned/archived conversations', () => {
    render(
      <ConversationCard
        conversation={conversation({ pinned: true, archived: true })}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Unpin')).toBeInTheDocument();
    expect(screen.getByText('Unarchive')).toBeInTheDocument();
  });

  it('pins a conversation from the menu', async () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Pin'));
    await waitFor(() => {
      expect(data.togglePin).toHaveBeenCalledWith('conv-1');
      expect(screen.queryByText('Pin')).toBeNull();
    });
  });

  it('archives a conversation from the menu', async () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Archive'));
    await waitFor(() => {
      expect(data.toggleArchive).toHaveBeenCalledWith('conv-1');
      expect(addToast).toHaveBeenCalledWith('Conversation archived', 'info');
    });
  });

  it('duplicates a conversation from the menu', async () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Duplicate'));
    await waitFor(() => {
      expect(data.duplicateConversation).toHaveBeenCalledWith('conv-1');
      expect(addToast).toHaveBeenCalledWith(
        'Conversation duplicated',
        'success'
      );
    });
  });

  it('deletes a conversation from the menu', async () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => {
      expect(data.deleteConversation).toHaveBeenCalledWith('conv-1');
      expect(addToast).toHaveBeenCalledWith('Conversation deleted', 'info');
    });
  });

  it('renames on double-click and submits on Enter', async () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.doubleClick(screen.getByText('My Chat'));
    const input = screen.getByDisplayValue('My Chat');
    fireEvent.change(input, { target: { value: 'Renamed' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => {
      expect(data.renameConversation).toHaveBeenCalledWith('conv-1', 'Renamed');
      expect(screen.queryByDisplayValue('Renamed')).toBeNull();
    });
  });

  it('cancels renaming on Escape', () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.doubleClick(screen.getByText('My Chat'));
    const input = screen.getByDisplayValue('My Chat');
    fireEvent.change(input, { target: { value: 'Cancelled' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(data.renameConversation).not.toHaveBeenCalled();
    expect(screen.getByText('My Chat')).toBeInTheDocument();
  });

  it('submits a rename on blur', async () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.doubleClick(screen.getByText('My Chat'));
    const input = screen.getByDisplayValue('My Chat');
    fireEvent.change(input, { target: { value: 'Blurred' } });
    fireEvent.blur(input);
    await waitFor(() =>
      expect(data.renameConversation).toHaveBeenCalledWith('conv-1', 'Blurred')
    );
  });

  it('ignores blank rename submissions', async () => {
    render(<ConversationCard conversation={conversation()} />);
    fireEvent.doubleClick(screen.getByText('My Chat'));
    const input = screen.getByDisplayValue('My Chat');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() => expect(data.renameConversation).not.toHaveBeenCalled());
  });
});
