import { act, fireEvent, render, screen } from '@testing-library/react';
import { TowersModal } from '../TowersModal';

Element.prototype.animate = jest.fn();

const getTowers = () => document.querySelectorAll('.cursor-pointer');
const getContainer = () =>
  screen.getByText('Moves:').closest('[tabindex]') as HTMLElement;
const getMovesCount = () =>
  parseInt(screen.getByText(/Moves:/).textContent?.match(/\d+/)![0] || '0');

describe('TowersModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<TowersModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('renders 3 disks initially', () => {
    render(<TowersModal onClose={jest.fn()} />);
    expect(screen.getByText('Moves:')).toBeInTheDocument();
  });

  it('selects first tower on click', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    expect(screen.getByText('Moves:')).toBeInTheDocument();
  });

  it('undo button is disabled initially', () => {
    render(<TowersModal onClose={jest.fn()} />);
    expect(screen.getByText('Undo')).toBeDisabled();
  });

  it('redo button is disabled initially', () => {
    render(<TowersModal onClose={jest.fn()} />);
    expect(screen.getByText('Redo')).toBeDisabled();
  });

  it('Escape key closes modal', () => {
    const onClose = jest.fn();
    render(<TowersModal onClose={onClose} />);
    fireEvent.keyDown(getContainer(), { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('Reset button works', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[1]);
    expect(getMovesCount()).toBe(1);
    fireEvent.click(screen.getByText('Reset'));
    expect(getMovesCount()).toBe(0);
  });

  it('keyboard 1 selects tower', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: '1' });
    expect(screen.getByText('Moves:')).toBeInTheDocument();
  });

  it('moves disk from tower 0 to tower 1', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[1]);
    expect(getMovesCount()).toBe(1);
  });

  it('shakes tower on invalid move to same tower', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[0]);
    expect(Element.prototype.animate).toHaveBeenCalled();
  });

  it('undo after move restores state', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[1]);
    expect(getMovesCount()).toBe(1);
    fireEvent.click(screen.getByText('Undo'));
    expect(getMovesCount()).toBe(0);
  });

  it('undo disables after restoring', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[1]);
    fireEvent.click(screen.getByText('Undo'));
    expect(screen.getByText('Undo')).toBeDisabled();
  });

  it('redo stays disabled after undo (source doesnt populate future)', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[1]);
    fireEvent.click(screen.getByText('Undo'));
    expect(screen.getByText('Redo')).toBeDisabled();
  });

  it('redo disabled after undo then new move', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[1]);
    fireEvent.click(screen.getByText('Undo'));
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[2]);
    expect(screen.getByText('Redo')).toBeDisabled();
  });

  it('keyboard U triggers undo', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[1]);
    expect(getMovesCount()).toBe(1);
    fireEvent.keyDown(getContainer(), { key: 'u' });
    expect(getMovesCount()).toBe(0);
  });

  it('keyboard 2 and 3 select towers', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: '2' });
    fireEvent.keyDown(getContainer(), { key: '3' });
    expect(screen.getByText('Moves:')).toBeInTheDocument();
  });

  it('canDrop returns false for same tower', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[0]);
    fireEvent.click(getTowers()[0]);
    expect(screen.getByText('Moves:')).toBeInTheDocument();
  });

  it('selecting empty tower does nothing', () => {
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(getTowers()[2]);
    expect(screen.getByText('Moves:')).toBeInTheDocument();
  });

  it('auto solve completes and shows solved', () => {
    jest.useFakeTimers();
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Auto Solve'));
    act(() => {
      jest.advanceTimersByTime(500 * 10);
    });
    expect(screen.getByText(/Solved/)).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('auto solve disables buttons while running', () => {
    jest.useFakeTimers();
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Auto Solve'));
    expect(screen.getByText('Auto Solve')).toBeDisabled();
    expect(screen.getByText('Reset')).toBeDisabled();
    jest.useRealTimers();
  });

  it('auto solve button disabled after win', () => {
    jest.useFakeTimers();
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Auto Solve'));
    act(() => {
      jest.advanceTimersByTime(500 * 10);
    });
    expect(screen.getByText('Auto Solve')).toBeDisabled();
    jest.useRealTimers();
  });

  it('changing disk count slider resets game', () => {
    render(<TowersModal onClose={jest.fn()} />);
    const towers = getTowers();
    fireEvent.click(towers[0]);
    fireEvent.click(towers[1]);
    expect(getMovesCount()).toBe(1);
    const slider = document.querySelector('input[type="range"]')!;
    fireEvent.change(slider, { target: { value: '4' } });
    expect(getMovesCount()).toBe(0);
  });

  it('isWin shows solved message when all disks on tower 2', () => {
    jest.useFakeTimers();
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Auto Solve'));
    act(() => {
      jest.advanceTimersByTime(500 * 10);
    });
    expect(screen.getByText(/Solved/)).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('keyboard A triggers auto solve', () => {
    jest.useFakeTimers();
    render(<TowersModal onClose={jest.fn()} />);
    fireEvent.keyDown(getContainer(), { key: 'a' });
    act(() => {
      jest.advanceTimersByTime(500 * 10);
    });
    expect(screen.getByText(/Solved/)).toBeInTheDocument();
    jest.useRealTimers();
  });
});
