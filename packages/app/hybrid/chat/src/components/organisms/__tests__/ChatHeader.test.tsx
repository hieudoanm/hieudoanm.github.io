import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatHeader } from '../ChatHeader';
import type { Conversation } from '@/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(() => ({ addToast: jest.fn() })),
}));

jest.mock('@/utils/format', () => ({
  exportAsMarkdown: jest.fn(() => '# md'),
  exportAsJSON: jest.fn(() => '{}'),
}));

jest.mock('@/lib/db', () => ({ db: {} }));

const { useRouter } = jest.requireMock('next/navigation');
const { useData } = jest.requireMock('@/providers/DataProvider');
const { useToast } = jest.requireMock('@/providers/ToastProvider');
const { exportAsMarkdown, exportAsJSON } = jest.requireMock('@/utils/format');
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
  renameConversation: jest.fn(),
  deleteConversation: jest.fn(),
  currentMessages: [
    {
      id: 'm1',
      conversationId: 'conv-1',
      role: 'user',
      content: 'hi',
      timestamp: 1000,
    },
  ],
};

describe('ChatHeader', () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push });
    useData.mockReturnValue(data);
    useToast.mockReturnValue({ addToast });
  });

  const backButton = () => screen.getAllByRole('button')[0];
  const menuButton = () => screen.getAllByRole('button')[1];

  it('renders the conversation title and model', () => {
    render(<ChatHeader conversation={conversation()} />);
    expect(screen.getByText('My Chat')).toBeInTheDocument();
    expect(screen.getByText('gpt-4o')).toBeInTheDocument();
  });

  it('navigates back on back button click', () => {
    render(<ChatHeader conversation={conversation()} />);
    fireEvent.click(backButton());
    expect(push).toHaveBeenCalledWith('/');
  });

  it('opens and closes the menu', () => {
    render(<ChatHeader conversation={conversation()} />);
    const toggle = menuButton();
    expect(screen.queryByText('Export Markdown')).toBeNull();
    fireEvent.click(toggle);
    expect(screen.getByText('Export Markdown')).toBeInTheDocument();
    expect(screen.getByText('Export JSON')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByText('Export Markdown')).toBeNull();
  });

  it('closes the menu when clicking outside', () => {
    render(<ChatHeader conversation={conversation()} />);
    fireEvent.click(menuButton());
    expect(screen.getByText('Rename')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Rename')).toBeNull();
  });

  it('renames inline on double click and submits on Enter', async () => {
    render(<ChatHeader conversation={conversation()} />);
    fireEvent.doubleClick(screen.getByText('My Chat'));
    const input = screen.getByDisplayValue('My Chat');
    fireEvent.change(input, { target: { value: 'Renamed' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() =>
      expect(data.renameConversation).toHaveBeenCalledWith('conv-1', 'Renamed')
    );
  });

  it('renames from the menu and cancels on Escape', () => {
    render(<ChatHeader conversation={conversation()} />);
    fireEvent.click(menuButton());
    fireEvent.click(screen.getByText('Rename'));
    const input = screen.getByDisplayValue('My Chat');
    fireEvent.change(input, { target: { value: 'Cancelled' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(data.renameConversation).not.toHaveBeenCalled();
  });

  it('ignores blank rename submissions', async () => {
    render(<ChatHeader conversation={conversation()} />);
    fireEvent.doubleClick(screen.getByText('My Chat'));
    const input = screen.getByDisplayValue('My Chat');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.blur(input);
    await waitFor(() => expect(data.renameConversation).not.toHaveBeenCalled());
  });

  it('deletes a conversation and navigates home', async () => {
    render(<ChatHeader conversation={conversation()} />);
    fireEvent.click(menuButton());
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => {
      expect(data.deleteConversation).toHaveBeenCalledWith('conv-1');
      expect(addToast).toHaveBeenCalledWith('Conversation deleted', 'info');
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  it('exports the conversation as markdown', () => {
    const createUrl = jest.fn().mockReturnValue('blob:md');
    const revokeUrl = jest.fn();
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createUrl,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeUrl,
    });
    render(<ChatHeader conversation={conversation()} />);
    fireEvent.click(menuButton());
    fireEvent.click(screen.getByText('Export Markdown'));
    expect(exportAsMarkdown).toHaveBeenCalledWith(
      'My Chat',
      data.currentMessages
    );
    expect(createUrl).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeUrl).toHaveBeenCalled();
    expect(addToast).toHaveBeenCalledWith('Exported as Markdown', 'success');
    clickSpy.mockRestore();
  });

  it('exports the conversation as JSON', () => {
    const createUrl = jest.fn().mockReturnValue('blob:json');
    const revokeUrl = jest.fn();
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createUrl,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeUrl,
    });
    render(<ChatHeader conversation={conversation()} />);
    fireEvent.click(menuButton());
    fireEvent.click(screen.getByText('Export JSON'));
    expect(exportAsJSON).toHaveBeenCalledWith(
      expect.any(Object),
      data.currentMessages
    );
    expect(createUrl).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeUrl).toHaveBeenCalled();
    expect(addToast).toHaveBeenCalledWith('Exported as JSON', 'success');
    clickSpy.mockRestore();
  });
});
