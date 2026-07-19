import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovesPanel } from '../components/MovesPanel';
import type { MoveRecord } from '../types';

const moves: MoveRecord[] = [
  { san: 'e4', fen: 'fen1' },
  { san: 'e5', fen: 'fen2' },
  { san: 'Nf3', fen: 'fen3' },
  { san: 'Nc6', fen: 'fen4' },
];

const props = (overrides: Record<string, unknown> = {}) => ({
  moves,
  cursor: 1,
  onJumpTo: jest.fn(),
  onUndo: jest.fn(),
  onRedo: jest.fn(),
  ...overrides,
});

describe('MovesPanel', () => {
  it('renders nothing when moves is empty', () => {
    const { container } = render(<MovesPanel {...props({ moves: [] })} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders move buttons', () => {
    render(<MovesPanel {...props()} />);
    expect(screen.getByText('e4')).toBeTruthy();
    expect(screen.getByText('e5')).toBeTruthy();
  });

  it('calls onJumpTo when a move button is clicked', async () => {
    const p = props();
    render(<MovesPanel {...p} />);
    await userEvent.click(screen.getByText('e4'));
    expect(p.onJumpTo).toHaveBeenCalledWith(0);
  });

  it('calls onUndo when undo button is clicked', async () => {
    const p = props();
    render(<MovesPanel {...p} />);
    const undoBtn = screen.getByTitle(/Undo/);
    await userEvent.click(undoBtn);
    expect(p.onUndo).toHaveBeenCalled();
  });

  it('calls onRedo when redo button is clicked', async () => {
    const p = props();
    render(<MovesPanel {...p} />);
    const redoBtn = screen.getByTitle(/Redo/);
    await userEvent.click(redoBtn);
    expect(p.onRedo).toHaveBeenCalled();
  });

  it('displays cursor info', () => {
    render(<MovesPanel {...props({ cursor: 2 })} />);
    expect(screen.getByText('3/4')).toBeTruthy();
  });

  it('disables undo when cursor is -1', () => {
    render(<MovesPanel {...props({ cursor: -1 })} />);
    expect(screen.getByTitle(/Undo/)).toBeDisabled();
  });

  it('disables redo when cursor is at last move', () => {
    render(<MovesPanel {...props({ cursor: moves.length - 1 })} />);
    expect(screen.getByTitle(/Redo/)).toBeDisabled();
  });
});
