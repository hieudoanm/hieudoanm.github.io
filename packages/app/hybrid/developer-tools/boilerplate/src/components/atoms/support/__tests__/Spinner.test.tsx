import { render } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders spinner with default size', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container, rerender } = render(<Spinner size="sm" />);
    expect(container.querySelector('.loading-sm')).toBeInTheDocument();
    rerender(<Spinner size="lg" />);
    expect(container.querySelector('.loading-lg')).toBeInTheDocument();
  });
});
