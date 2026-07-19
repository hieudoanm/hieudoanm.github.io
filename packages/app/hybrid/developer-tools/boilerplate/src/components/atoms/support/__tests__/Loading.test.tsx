import { render } from '@testing-library/react';
import { Loading } from '../Loading';

describe('Loading', () => {
  it('renders a spinner by default', () => {
    const { container } = render(<Loading />);
    const el = container.querySelector('.loading');
    expect(el).toHaveClass('loading', 'loading-spinner');
  });

  it('applies variant and size classes', () => {
    const { container } = render(<Loading variant="dots" size="lg" />);
    const el = container.querySelector('.loading');
    expect(el).toHaveClass('loading-dots', 'loading-lg');
  });
});
