import { render, screen, act, fireEvent } from '@testing-library/react';
import { usePullToRefresh } from '../usePullToRefresh';

interface HarnessProps {
  onRefresh: () => Promise<void>;
  threshold?: number;
}

function Harness({ onRefresh, threshold }: HarnessProps) {
  const { isRefreshing, pullDistance, handlers } = usePullToRefresh({
    onRefresh,
    threshold,
  });
  return (
    <div data-testid="container" {...handlers}>
      <span data-testid="refreshing">{String(isRefreshing)}</span>
      <span data-testid="distance">{String(pullDistance)}</span>
    </div>
  );
}

const touch = (clientY: number) => ({
  touches: [{ clientX: 0, clientY }],
});

describe('usePullToRefresh', () => {
  const onRefresh = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    onRefresh.mockClear();
  });

  it('refreshes when the pull distance exceeds the threshold', async () => {
    render(<Harness onRefresh={onRefresh} />);
    const container = screen.getByTestId('container');
    Object.defineProperty(container, 'scrollTop', { value: 0, writable: true });

    fireEvent.touchStart(container, touch(0));
    fireEvent.touchMove(container, touch(200));
    expect(Number(screen.getByTestId('distance').textContent)).toBeGreaterThan(
      0
    );

    await act(async () => {
      fireEvent.touchEnd(container);
    });
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('refreshing')).toHaveTextContent('false');
    expect(screen.getByTestId('distance')).toHaveTextContent('0');
  });

  it('does not track a pull when the container is scrolled down', () => {
    render(<Harness onRefresh={onRefresh} />);
    const container = screen.getByTestId('container');
    Object.defineProperty(container, 'scrollTop', {
      value: 50,
      writable: true,
    });

    fireEvent.touchStart(container, touch(0));
    fireEvent.touchMove(container, touch(300));
    fireEvent.touchEnd(container);
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it('ignores upward drags', () => {
    render(<Harness onRefresh={onRefresh} />);
    const container = screen.getByTestId('container');
    Object.defineProperty(container, 'scrollTop', { value: 0, writable: true });

    fireEvent.touchStart(container, touch(200));
    fireEvent.touchMove(container, touch(50));
    fireEvent.touchEnd(container);
    expect(screen.getByTestId('distance')).toHaveTextContent('0');
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it('does not refresh when the pull is below the threshold', async () => {
    render(<Harness onRefresh={onRefresh} />);
    const container = screen.getByTestId('container');
    Object.defineProperty(container, 'scrollTop', { value: 0, writable: true });

    fireEvent.touchStart(container, touch(0));
    fireEvent.touchMove(container, touch(100));
    await act(async () => {
      fireEvent.touchEnd(container);
    });
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it('ignores touches while already refreshing', async () => {
    let resolveRefresh: () => void = () => undefined;
    onRefresh.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveRefresh = resolve;
      })
    );

    render(<Harness onRefresh={onRefresh} />);
    const container = screen.getByTestId('container');
    Object.defineProperty(container, 'scrollTop', { value: 0, writable: true });

    fireEvent.touchStart(container, touch(0));
    fireEvent.touchMove(container, touch(200));
    fireEvent.touchEnd(container);
    expect(onRefresh).toHaveBeenCalledTimes(1);

    fireEvent.touchStart(container, touch(0));
    fireEvent.touchMove(container, touch(400));
    expect(screen.getByTestId('distance')).toHaveTextContent('0');

    await act(async () => {
      resolveRefresh();
    });
  });

  it('handles refresh failures without throwing', async () => {
    onRefresh.mockRejectedValue(new Error('network down'));
    render(<Harness onRefresh={onRefresh} />);
    const container = screen.getByTestId('container');
    Object.defineProperty(container, 'scrollTop', { value: 0, writable: true });

    fireEvent.touchStart(container, touch(0));
    fireEvent.touchMove(container, touch(200));
    await act(async () => {
      fireEvent.touchEnd(container);
    });
    expect(screen.getByTestId('refreshing')).toHaveTextContent('false');
  });

  it('caps the pull distance at 1.5x the threshold', () => {
    render(<Harness onRefresh={onRefresh} threshold={100} />);
    const container = screen.getByTestId('container');
    Object.defineProperty(container, 'scrollTop', { value: 0, writable: true });

    fireEvent.touchStart(container, touch(0));
    fireEvent.touchMove(container, touch(10000));
    expect(Number(screen.getByTestId('distance').textContent)).toBe(150);
  });
});
