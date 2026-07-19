import { fireEvent, render, screen } from '@testing-library/react';
import { ImageComparison } from '../ImageComparison';

describe('ImageComparison', () => {
  const rect = {
    left: 0,
    top: 0,
    width: 200,
    height: 100,
    right: 200,
    bottom: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders both images and a slider', () => {
    render(
      <ImageComparison
        before="/before.png"
        beforeAlt="Before"
        after="/after.png"
        afterAlt="After"
      />
    );
    expect(screen.getByAltText('Before')).toBeInTheDocument();
    expect(screen.getByAltText('After')).toBeInTheDocument();
    expect(
      screen.getByRole('slider', { name: 'Compare images' })
    ).toHaveAttribute('aria-valuenow', '50');
  });

  it('moves the slider on pointer down', () => {
    const { container } = render(
      <ImageComparison
        before="/before.png"
        beforeAlt="Before"
        after="/after.png"
        afterAlt="After"
      />
    );
    const root = container.firstChild as HTMLElement;
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect);
    const down = new window.MouseEvent('pointerdown', {
      clientX: 50,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(root, down);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '25');
  });

  it('clamps the initial position', () => {
    render(
      <ImageComparison
        before="/b.png"
        beforeAlt="B"
        after="/a.png"
        afterAlt="A"
        initial={150}
      />
    );
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps dragging at the edges', () => {
    const { container } = render(
      <ImageComparison
        before="/b.png"
        beforeAlt="B"
        after="/a.png"
        afterAlt="A"
      />
    );
    const root = container.firstChild as HTMLElement;
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect);
    const down = new window.MouseEvent('pointerdown', {
      clientX: 300,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(root, down);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '100');
    const left = new window.MouseEvent('pointermove', {
      clientX: -10,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(root, left);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '0');
  });

  it('does not move without a drag in progress', () => {
    const { container } = render(
      <ImageComparison
        before="/b.png"
        beforeAlt="B"
        after="/a.png"
        afterAlt="A"
      />
    );
    const root = container.firstChild as HTMLElement;
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect);
    const move = new window.MouseEvent('pointermove', {
      clientX: 50,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(root, move);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
  });

  it('stops dragging after pointer up', () => {
    const { container } = render(
      <ImageComparison
        before="/b.png"
        beforeAlt="B"
        after="/a.png"
        afterAlt="A"
      />
    );
    const root = container.firstChild as HTMLElement;
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue(rect);
    const down = new window.MouseEvent('pointerdown', {
      clientX: 50,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(root, down);
    const up = new window.MouseEvent('pointerup', {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(root, up);
    const move = new window.MouseEvent('pointermove', {
      clientX: 100,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(root, move);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '25');
  });

  it('ignores pointer events on a zero-width container', () => {
    const { container } = render(
      <ImageComparison
        before="/b.png"
        beforeAlt="B"
        after="/a.png"
        afterAlt="A"
      />
    );
    const root = container.firstChild as HTMLElement;
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
    const down = new window.MouseEvent('pointerdown', {
      clientX: 50,
      bubbles: true,
      cancelable: true,
    });
    fireEvent(root, down);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
  });
});
