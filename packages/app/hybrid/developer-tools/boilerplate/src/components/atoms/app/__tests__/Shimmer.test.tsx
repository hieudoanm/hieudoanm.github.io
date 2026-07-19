import { render } from '@testing-library/react';
import { Shimmer } from '../Shimmer';

describe('Shimmer', () => {
  it('renders a hidden shimmer block with default rounding', () => {
    const { container } = render(<Shimmer />);
    const block = container.querySelector('[aria-hidden="true"]');
    expect(block).toBeInTheDocument();
    expect(block).toHaveClass('rounded-lg');
    expect(block).toHaveAttribute('style');
  });

  it('applies a custom rounded class', () => {
    const { container } = render(<Shimmer rounded="rounded-full" />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      'rounded-full'
    );
  });

  it('accepts a className', () => {
    const { container } = render(<Shimmer className="h-8 w-8" />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      'h-8 w-8'
    );
  });
});
