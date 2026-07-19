import { render } from '@testing-library/react';
import LoadingPage from '../loading';

describe('LoadingPage', () => {
  it('renders a loading spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
    expect(container.querySelector('.loading-spinner')).toHaveClass(
      'loading',
      'loading-lg',
      'text-primary'
    );
  });
});
