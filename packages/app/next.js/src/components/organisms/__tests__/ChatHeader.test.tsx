import { fireEvent, render, screen } from '@testing-library/react';
import { ChatHeader } from '../chat/ChatHeader';

const mockModels = [
  { company: 'Test', label: 'Model A', value: 'model-a' },
  { company: 'Test', label: 'Model B', value: 'model-b' },
];

describe('ChatHeader', () => {
  const baseProps = {
    model: 'model-a',
    models: mockModels,
    onModelChange: () => {},
    onNewChat: () => {},
    onToggleSidebar: () => {},
  };

  it('to match snapshot', () => {
    const { container } = render(<ChatHeader {...baseProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders title', () => {
    render(<ChatHeader {...baseProps} title="My Chat" />);
    expect(screen.getByText('My Chat')).toBeInTheDocument();
  });

  it('renders default title', () => {
    render(<ChatHeader {...baseProps} />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('renders new chat button', () => {
    render(<ChatHeader {...baseProps} />);
    expect(screen.getByText('New chat')).toBeInTheDocument();
  });

  it('calls onNewChat when new chat clicked', () => {
    const onNewChat = jest.fn();
    render(<ChatHeader {...baseProps} onNewChat={onNewChat} />);
    fireEvent.click(screen.getByText('New chat'));
    expect(onNewChat).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleSidebar when hamburger clicked', () => {
    const onToggleSidebar = jest.fn();
    render(<ChatHeader {...baseProps} onToggleSidebar={onToggleSidebar} />);
    const buttons = screen.getAllByRole('button');
    const hamburger = buttons.find((b) => b.querySelector('svg') !== null);
    fireEvent.click(hamburger!);
    expect(onToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it('renders model selector', () => {
    render(<ChatHeader {...baseProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
