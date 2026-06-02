import { render, screen, fireEvent } from '@solidjs/testing-library';
import { ToolCard } from '../ToolCard';

describe('ToolCard', () => {
  const defaultProps = {
    label: 'Calculator',
    description: 'Perform calculations',
    emoji: '🧮',
    color: '#ff6600',
    onClick: () => {},
  };

  it('renders the label', () => {
    render(() => <ToolCard {...defaultProps} />);
    expect(screen.getByText('Calculator')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(() => <ToolCard {...defaultProps} />);
    expect(screen.getByText('Perform calculations')).toBeInTheDocument();
  });

  it('renders the emoji', () => {
    render(() => <ToolCard {...defaultProps} />);
    expect(screen.getByText('🧮')).toBeInTheDocument();
  });

  it('renders as a button', () => {
    render(() => <ToolCard {...defaultProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(() => <ToolCard {...defaultProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('passes the onClick as a prop', () => {
    const onClick = vi.fn();
    render(() => <ToolCard {...defaultProps} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveProperty('onclick');
  });
});
