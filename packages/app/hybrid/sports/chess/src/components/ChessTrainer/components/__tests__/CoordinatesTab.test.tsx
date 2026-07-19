import { render, screen, act } from '@testing-library/react';

jest.mock('react-chessboard', () => ({
  Chessboard: (props: {
    options: {
      onSquareClick?: (args: { square: string }) => void;
    };
  }) => {
    globalThis.__captured = props.options;
    return <div data-testid="chessboard" />;
  },
}));

import { CoordinatesTab } from '../CoordinatesTab';

declare global {
  // eslint-disable-next-line no-var
  var __captured: { onSquareClick?: (args: { square: string }) => void } | null;
}

describe('CoordinatesTab', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    globalThis.__captured = null;
  });

  afterEach(() => {
    act(() => jest.runAllTimers());
    jest.useRealTimers();
  });

  it('renders with click mode', () => {
    render(<CoordinatesTab />);
    expect(screen.getByText('Board Coordinates')).toBeTruthy();
    expect(
      screen.getByRole('button', { name: /Click the square/ })
    ).toBeTruthy();
  });

  it('switches to name mode', () => {
    render(<CoordinatesTab />);
    act(() => screen.getByRole('button', { name: /Type the square/ }).click());
    expect(screen.getByPlaceholderText('e.g. e4')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
  });

  it('switches back to click mode', () => {
    render(<CoordinatesTab />);
    act(() => screen.getByRole('button', { name: /Type the square/ }).click());
    act(() => screen.getByRole('button', { name: /Click the square/ }).click());
    expect(screen.queryByPlaceholderText('e.g. e4')).toBeNull();
  });

  it('resets rounds on mode switch', () => {
    render(<CoordinatesTab />);
    const target = document.querySelector('.text-2xl')?.textContent ?? 'a1';
    act(() => {
      globalThis.__captured?.onSquareClick?.({ square: target });
    });
    expect(screen.getByText('Correct!')).toBeTruthy();
    act(() => screen.getByRole('button', { name: /Type the square/ }).click());
    expect(screen.queryByText('Correct!')).toBeNull();
  });

  it('correct click shows flash', () => {
    render(<CoordinatesTab />);
    const target = document.querySelector('.text-2xl')?.textContent ?? 'a1';
    act(() => {
      globalThis.__captured?.onSquareClick?.({ square: target });
    });
    expect(screen.getByText('Correct!')).toBeTruthy();
  });

  it('wrong click shows error', () => {
    render(<CoordinatesTab />);
    const target = document.querySelector('.text-2xl')?.textContent ?? 'a1';
    const wrong = target === 'a1' ? 'h8' : 'a1';
    act(() => {
      globalThis.__captured?.onSquareClick?.({ square: wrong });
    });
    expect(screen.getByText(/Not quite/)).toBeTruthy();
  });

  it('ignores click during flash', () => {
    render(<CoordinatesTab />);
    const target = document.querySelector('.text-2xl')?.textContent ?? 'a1';
    act(() => {
      globalThis.__captured?.onSquareClick?.({ square: target });
    });
    act(() => {
      globalThis.__captured?.onSquareClick?.({ square: 'a1' });
    });
    expect(screen.getByText('Correct!')).toBeTruthy();
  });

  it('shows best score', () => {
    render(<CoordinatesTab />);
    expect(screen.getByText(/Best: 0 pts/)).toBeTruthy();
  });

  it('completes a round of 20 correct clicks', () => {
    render(<CoordinatesTab />);
    for (let i = 0; i < 20; i++) {
      const target = document.querySelector('.text-2xl')?.textContent ?? 'a1';
      act(() => {
        globalThis.__captured?.onSquareClick?.({ square: target });
      });
      act(() => jest.advanceTimersByTime(400));
    }
    expect(screen.getByText(/Round 1 \/ 20/)).toBeTruthy();
  });

  it('completes round with score update for new best', () => {
    render(<CoordinatesTab />);
    for (let i = 0; i < 20; i++) {
      const target = document.querySelector('.text-2xl')?.textContent ?? 'a1';
      act(() => {
        globalThis.__captured?.onSquareClick?.({ square: target });
      });
      act(() => jest.advanceTimersByTime(400));
    }
    expect(screen.getByText(/Best: 20 pts/)).toBeTruthy();
  });
});
