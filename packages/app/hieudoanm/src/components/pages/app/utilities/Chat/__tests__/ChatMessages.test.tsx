import { render, screen, fireEvent } from '@testing-library/react';
import { Messages } from '../ChatMessagesModal';

jest.mock('marked', () => ({
  marked: jest.fn((text: string) => `<p>${text}</p>`),
}));

jest.mock('../ChatCounterModal', () => ({
  Counter: () => <div data-testid="counter">Counter</div>,
}));

jest.mock('@frontend/native', () => ({
  createClipboard: jest.fn().mockReturnValue({ copy: jest.fn() }),
}));

const { createClipboard } = jest.requireMock('@frontend/native');
const mockCopy = createClipboard().copy;

describe('Messages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when no messages', () => {
    render(<Messages messages={[]} />);
    expect(screen.getByText(/Pick a model/)).toBeInTheDocument();
  });

  it('shows model count in empty state', () => {
    render(<Messages messages={[]} />);
    expect(screen.getByText('Free models available')).toBeInTheDocument();
  });

  it('renders user messages', () => {
    const messages = [
      { role: 'user' as const, text: 'Hello', loading: false, model: 'gpt-4' },
    ];
    render(<Messages messages={messages} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('shows user model name', () => {
    const messages = [
      { role: 'user' as const, text: 'Hi', loading: false, model: 'gpt-4' },
    ];
    render(<Messages messages={messages} />);
    expect(screen.getAllByText('gpt-4').length).toBeGreaterThanOrEqual(1);
  });

  it('shows loading state for AI messages', () => {
    const messages = [
      { role: 'ai' as const, text: '', loading: true, model: 'gpt-4' },
    ];
    render(<Messages messages={messages} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('gpt-4')).toBeInTheDocument();
  });

  it('shows Counter in loading state', () => {
    const messages = [
      { role: 'ai' as const, text: '', loading: true, model: 'gpt-4' },
    ];
    render(<Messages messages={messages} />);
    expect(screen.getByTestId('counter')).toBeInTheDocument();
  });

  it('renders completed AI messages', () => {
    const messages = [
      {
        role: 'ai' as const,
        text: 'Response text',
        loading: false,
        model: 'gpt-4',
      },
    ];
    render(<Messages messages={messages} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('renders AI response as HTML via marked', () => {
    const messages = [
      {
        role: 'ai' as const,
        text: '**bold**',
        loading: false,
        model: 'gpt-4',
      },
    ];
    render(<Messages messages={messages} />);
    const markdownDiv = document.querySelector('.markdown-body');
    expect(markdownDiv?.innerHTML).toContain('<p>**bold**</p>');
  });

  it('copies AI text on clipboard button click', () => {
    const messages = [
      {
        role: 'ai' as const,
        text: 'Copy this text',
        loading: false,
        model: 'gpt-4',
      },
    ];
    render(<Messages messages={messages} />);
    const copyButton = screen.getByText('📋');
    fireEvent.click(copyButton);
    expect(mockCopy).toHaveBeenCalledWith('Copy this text');
  });
});
