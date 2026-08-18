import { fireEvent, render, screen } from '@testing-library/react';
import { Resizable } from '../Resizable';

describe('Resizable', () => {
  it('renders both panes', () => {
    render(<Resizable first={<div>First</div>} second={<div>Second</div>} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders a horizontal separator by default', () => {
    render(<Resizable first={<div>First</div>} second={<div>Second</div>} />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders a vertical separator for vertical direction', () => {
    render(
      <Resizable
        direction="vertical"
        first={<div>First</div>}
        second={<div>Second</div>}
      />
    );
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical'
    );
  });

  it('clamps the initial ratio to the allowed range', () => {
    const { container } = render(
      <Resizable
        initialRatio={0.1}
        minRatio={0.2}
        first={<div>First</div>}
        second={<div>Second</div>}
      />
    );
    const firstPane = container.querySelector('.min-w-0') as HTMLElement;
    expect(firstPane.style.width).toBe('20%');
  });

  it('resizes the first pane while dragging the separator', () => {
    const { container } = render(
      <Resizable first={<div>First</div>} second={<div>Second</div>} />
    );
    const root = container.querySelector('.relative') as HTMLElement;
    const separator = screen.getByRole('separator');
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 100,
      left: 0,
      top: 0,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);

    fireEvent.pointerDown(separator);
    fireEvent.pointerMove(separator, { clientX: 100 });
    const firstPane = container.querySelector('.min-w-0') as HTMLElement;
    expect(firstPane.style.width).toBe('50%');
  });
});
