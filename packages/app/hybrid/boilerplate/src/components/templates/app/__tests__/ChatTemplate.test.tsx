import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ChatTemplate } from '../ChatTemplate';

const mockModels = [
  { company: 'Test', label: 'Model A', value: 'model-a' },
  { company: 'Test', label: 'Model B', value: 'model-b' },
];

const mockConversations = [
  {
    id: 'conv-1',
    title: 'Existing Chat',
    messages: [
      { id: '1', role: 'user' as const, content: 'Hello', timestamp: 100 },
    ],
    model: 'model-a',
    createdAt: 100,
    updatedAt: 100,
  },
];

describe('ChatTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ChatTemplate
        models={mockModels}
        conversations={mockConversations}
        activeConversationId="conv-1"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders header with title', () => {
    render(<ChatTemplate models={mockModels} />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('renders input area', () => {
    render(<ChatTemplate models={mockModels} />);
    expect(
      screen.getByPlaceholderText('Type a message...')
    ).toBeInTheDocument();
  });

  it('shows empty state when no messages', () => {
    render(<ChatTemplate models={mockModels} />);
    expect(screen.getByText('Start a conversation')).toBeInTheDocument();
  });

  it('adds user message on submit', () => {
    render(<ChatTemplate models={mockModels} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(textarea, { target: { value: 'Test message' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('calls onSendMessage when provided', async () => {
    const onSend = jest.fn().mockResolvedValue('AI response');
    render(<ChatTemplate models={mockModels} onSendMessage={onSend} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    await waitFor(() => {
      expect(onSend).toHaveBeenCalledWith('Hello');
    });
  });

  it('shows AI response after sending', async () => {
    const onSend = jest.fn().mockResolvedValue('Response from AI');
    render(<ChatTemplate models={mockModels} onSendMessage={onSend} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(textarea, { target: { value: 'Hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    await waitFor(() => {
      expect(screen.getByText('Response from AI')).toBeInTheDocument();
    });
  });

  it('shows error message when send fails', async () => {
    const onSend = jest.fn().mockRejectedValue(new Error('API error'));
    render(<ChatTemplate models={mockModels} onSendMessage={onSend} />);
    const textarea = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(textarea, { target: { value: 'Hi' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    await waitFor(() => {
      expect(
        screen.getByText('Sorry, an error occurred. Please try again.')
      ).toBeInTheDocument();
    });
  });

  it('calls onModelChange when model changes', () => {
    const onModelChange = jest.fn();
    render(<ChatTemplate models={mockModels} onModelChange={onModelChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'model-b' } });
    expect(onModelChange).toHaveBeenCalledWith('model-b');
  });

  it('clears messages on new chat', () => {
    const onNewChat = jest.fn();
    render(
      <ChatTemplate
        models={mockModels}
        onNewChat={onNewChat}
        initialMessages={[
          {
            id: '1',
            role: 'user',
            content: 'Old message',
            timestamp: 100,
          },
        ]}
      />
    );
    fireEvent.click(screen.getByText('New chat'));
    expect(screen.queryByText('Old message')).not.toBeInTheDocument();
    expect(onNewChat).toHaveBeenCalledTimes(1);
  });

  it('renders sidebar with conversations', () => {
    render(
      <ChatTemplate
        models={mockModels}
        conversations={mockConversations}
        activeConversationId="conv-1"
      />
    );
    expect(screen.getByText('Existing Chat')).toBeInTheDocument();
  });

  it('toggles sidebar visibility', () => {
    const { container } = render(
      <ChatTemplate models={mockModels} sidebarOpen={false} />
    );
    expect(screen.queryByText('Conversations')).not.toBeInTheDocument();
  });
});
