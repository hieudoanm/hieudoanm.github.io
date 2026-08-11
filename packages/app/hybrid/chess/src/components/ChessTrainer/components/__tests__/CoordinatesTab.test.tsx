import { act, render, screen } from '@testing-library/react';
import { CoordinatesTab } from '../CoordinatesTab';

var captured: {
  onSquareClick?: (args: { square: string }) => void;
} | null = null;

jest.mock('react-chessboard', () => ({
  Chessboard: (props: {
    options: {
      onSquareClick?: (args: { square: string }) => void;
    };
  }) => {
    captured = props.options;
    return <div data-testid="chessboard" />;
  },
}));

describe('CoordinatesTab', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it('shows the target square in click mode', () => {
    render(<CoordinatesTab />);
    expect(screen.getByText('Board Coordinates')).toBeInTheDocument();
    const label = document.querySelector('.text-2xl');
    expect(label?.textContent).toMatch(/^[a-h][1-8]$/);
  });

  it('scores a correct click', () => {
    render(<CoordinatesTab />);
    const label = document.querySelector('.text-2xl')?.textContent ?? 'a1';
    expect(captured).not.toBeNull();
    act(() => {
      captured!.onSquareClick?.({ square: label });
    });
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('scores a wrong click', () => {
    render(<CoordinatesTab />);
    const label = document.querySelector('.text-2xl')?.textContent ?? 'a1';
    const wrong = label === 'a1' ? 'h8' : 'a1';
    act(() => {
      captured!.onSquareClick?.({ square: wrong });
    });
    expect(screen.getByText(/Not quite/)).toBeInTheDocument();
  });
});
