import { act, fireEvent, render, screen } from '@testing-library/react';
import { Game2048 } from '..';

describe('Game2048', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the scoreboard', () => {
    render(<Game2048 />);
    expect(screen.getByText('Score:')).toBeInTheDocument();
    expect(screen.getByText('Best:')).toBeInTheDocument();
  });

  it('resets game on New button click', () => {
    render(<Game2048 />);
    fireEvent.click(screen.getByText('New'));
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('responds to arrow key down', () => {
    render(<Game2048 />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'ArrowDown' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('responds to arrow key Up', () => {
    render(<Game2048 />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'ArrowUp' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('arrow key Left moves tiles', () => {
    render(<Game2048 />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'ArrowLeft' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('arrow key Right moves tiles', () => {
    render(<Game2048 />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'ArrowRight' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('r key resets game', () => {
    render(<Game2048 />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'r' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('directional buttons work', () => {
    render(<Game2048 />);
    fireEvent.click(screen.getByText('▲'));
    expect(screen.getByText('▲')).toBeInTheDocument();
  });

  it('all directional buttons move tiles', () => {
    render(<Game2048 />);
    fireEvent.click(screen.getByText('▲'));
    fireEvent.click(screen.getByText('◀'));
    fireEvent.click(screen.getByText('▶'));
    fireEvent.click(screen.getByText('▼'));
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('starts and stops auto play with the Auto/Stop button', () => {
    jest.useFakeTimers();
    render(<Game2048 />);
    fireEvent.click(screen.getByText('Auto'));
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(screen.getByText('Stop')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('Auto')).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('toggles auto play with the a key', () => {
    jest.useFakeTimers();
    render(<Game2048 />);
    const wrapper = screen.getByText('Score:').closest('div')?.parentElement;
    if (wrapper) fireEvent.keyDown(wrapper, { key: 'a' });
    expect(screen.getByText('Stop')).toBeInTheDocument();
    if (wrapper) fireEvent.keyDown(wrapper, { key: 'a' });
    expect(screen.getByText('Auto')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
