import { render, fireEvent, act } from '@testing-library/react';
import { DinoRun } from '../index';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const mockCtx = {
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  fillText: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  createLinearGradient: jest.fn(() => ({
    addColorStop: jest.fn(),
  })),
  set fillStyle(_v: string) {},
  set strokeStyle(_v: string) {},
  set lineWidth(_v: number) {},
  set font(_v: string) {},
  set globalAlpha(_v: number) {},
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCtx) as any;
  (global as any).requestAnimationFrame = jest.fn(
    (cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    }
  );
  (global as any).cancelAnimationFrame = jest.fn();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('DinoRun component', () => {
  it('renders without crashing', () => {
    render(<DinoRun />);
  });

  it('renders score', () => {
    const { getByText } = render(<DinoRun />);
    expect(getByText('Score:')).toBeInTheDocument();
  });

  it('renders best score', () => {
    const { getByText } = render(<DinoRun />);
    expect(getByText('Best: 0')).toBeInTheDocument();
  });

  it('renders canvas', () => {
    const { container } = render(<DinoRun />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('renders How to Play button', () => {
    const { getByText } = render(<DinoRun />);
    expect(getByText('How to Play')).toBeInTheDocument();
  });

  it('opens help modal', () => {
    const { getByText } = render(<DinoRun />);
    fireEvent.click(getByText('How to Play'));
    expect(getByText('Got it!')).toBeInTheDocument();
  });

  it('renders idle prompt text', () => {
    const { getByText } = render(<DinoRun />);
    expect(getByText('Press Space or click to jump')).toBeInTheDocument();
  });

  it('starts game on canvas click', () => {
    const { container } = render(<DinoRun />);
    const canvas = container.querySelector('canvas')!;
    fireEvent.click(canvas);
  });

  it('starts game on Space key', () => {
    const { container } = render(<DinoRun />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: ' ' });
  });

  it('starts game on ArrowUp key', () => {
    const { container } = render(<DinoRun />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: 'ArrowUp' });
  });

  it('handles keyboard Escape', () => {
    const push = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push });
    const { container } = render(<DinoRun />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: 'Escape' });
    expect(push).toHaveBeenCalledWith('/');
  });

  it('renders keyboard hint', () => {
    const { getByText } = render(<DinoRun />);
    expect(
      getByText('Space/↑ jump · R restart · Esc close')
    ).toBeInTheDocument();
  });

  it('cleans up animation frame on unmount', () => {
    const { unmount } = render(<DinoRun />);
    unmount();
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });
});
