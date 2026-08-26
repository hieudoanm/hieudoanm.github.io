import { render, screen, fireEvent } from '@testing-library/react';
import { GameInstructions } from '../GameInstructions';

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  title: 'Test Game',
  subtitle: 'テストゲーム',
  instructions: ['Step one', 'Step two', 'Step three'],
  visualization: <div data-testid="viz">Viz</div>,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GameInstructions', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <GameInstructions {...defaultProps} isOpen={false} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders title and subtitle', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('Test Game')).toBeInTheDocument();
    expect(screen.getByText('テストゲーム')).toBeInTheDocument();
  });

  it('renders all instructions', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('Step one')).toBeInTheDocument();
    expect(screen.getByText('Step two')).toBeInTheDocument();
    expect(screen.getByText('Step three')).toBeInTheDocument();
  });

  it('renders instruction numbers', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('3.')).toBeInTheDocument();
  });

  it('renders visualization', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByTestId('viz')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    render(<GameInstructions {...defaultProps} />);
    fireEvent.click(screen.getByText('X'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Got it button clicked', () => {
    render(<GameInstructions {...defaultProps} />);
    fireEvent.click(screen.getByText('GOT IT!'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop clicked', () => {
    render(<GameInstructions {...defaultProps} />);
    const backdrop = document.querySelector('.absolute.inset-0')!;
    fireEvent.click(backdrop);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
