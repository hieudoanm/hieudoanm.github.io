import { fireEvent, render, screen } from '@testing-library/react';
import { PositionPanel } from '../PositionPanel';

const baseProps = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  pgn: '',
  onFENChange: jest.fn(),
  onPGNChange: jest.fn(),
  onReset: jest.fn(),
  onRandomize: jest.fn(),
};

describe('PositionPanel', () => {
  it('renders FEN label and input', () => {
    render(<PositionPanel {...baseProps} />);
    expect(screen.getByText('FEN String')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      )
    ).toBeInTheDocument();
  });

  it('renders PGN label and textarea', () => {
    render(<PositionPanel {...baseProps} />);
    expect(screen.getByText('PGN')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Paste PGN here…')).toBeInTheDocument();
  });

  it('renders Reset and Random 960 buttons', () => {
    render(<PositionPanel {...baseProps} />);
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /random 960/i })
    ).toBeInTheDocument();
  });

  it('shows PGN value in textarea', () => {
    render(<PositionPanel {...baseProps} pgn="1. e4 e5" />);
    expect(screen.getByDisplayValue('1. e4 e5')).toBeInTheDocument();
  });

  it('calls onFENChange when FEN input changes', () => {
    const onFENChange = jest.fn();
    render(<PositionPanel {...baseProps} onFENChange={onFENChange} />);
    const input = screen.getByDisplayValue(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
    fireEvent.change(input, { target: { value: 'new fen' } });
    expect(onFENChange).toHaveBeenCalledWith('new fen');
  });

  it('calls onPGNChange when PGN textarea changes', () => {
    const onPGNChange = jest.fn();
    render(<PositionPanel {...baseProps} onPGNChange={onPGNChange} />);
    const textarea = screen.getByPlaceholderText('Paste PGN here…');
    fireEvent.change(textarea, { target: { value: '1. e4' } });
    expect(onPGNChange).toHaveBeenCalledWith('1. e4');
  });

  it('calls onReset when Reset button clicked', () => {
    const onReset = jest.fn();
    render(<PositionPanel {...baseProps} onReset={onReset} />);
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(onReset).toHaveBeenCalled();
  });

  it('calls onRandomize when Random 960 button clicked', () => {
    const onRandomize = jest.fn();
    render(<PositionPanel {...baseProps} onRandomize={onRandomize} />);
    fireEvent.click(screen.getByRole('button', { name: /random 960/i }));
    expect(onRandomize).toHaveBeenCalled();
  });

  it('to match snapshot', () => {
    const { container } = render(<PositionPanel {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
