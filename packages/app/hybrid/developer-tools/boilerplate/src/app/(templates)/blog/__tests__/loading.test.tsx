import { render } from '@testing-library/react';
import BlogLoading from '@/app/(templates)/blog/loading';

describe('BlogLoading', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<BlogLoading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});
