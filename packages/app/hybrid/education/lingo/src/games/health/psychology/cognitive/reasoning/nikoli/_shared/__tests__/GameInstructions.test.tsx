import { render, screen } from '@testing-library/react';
import { GameInstructions } from '../GameInstructions';

describe('GameInstructions', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Sudoku',
    subtitle: '数独',
    instructions: ['Fill rows', 'Fill columns', 'Fill boxes'],
    visualization: <div>vis</div>,
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders nothing when closed', () => {
    const { container } = render(
      <GameInstructions {...defaultProps} isOpen={false} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders title when open', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('Sudoku')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('数独')).toBeInTheDocument();
  });

  it('renders instructions', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('Fill rows')).toBeInTheDocument();
    expect(screen.getByText('Fill columns')).toBeInTheDocument();
    expect(screen.getByText('Fill boxes')).toBeInTheDocument();
  });

  it('renders instruction numbers', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('3.')).toBeInTheDocument();
  });

  it('renders visualization', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('vis')).toBeInTheDocument();
  });

  it('renders Got it button', () => {
    render(<GameInstructions {...defaultProps} />);
    expect(screen.getByText('Got it!')).toBeInTheDocument();
  });

  it('calls onClose when Got it clicked', () => {
    render(<GameInstructions {...defaultProps} />);
    screen.getByText('Got it!').click();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop clicked', () => {
    render(<GameInstructions {...defaultProps} />);
    const backdrop = document.querySelector('.absolute.inset-0');
    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onClose when ✕ clicked', () => {
    render(<GameInstructions {...defaultProps} />);
    screen.getByText('✕').click();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
