import { render } from '@testing-library/react';
import AuthLoading from '@/app/(templates)/auth/loading';

describe('AuthLoading', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<AuthLoading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});
