import { render } from '@testing-library/react';
import StoreLoading from '@/app/(templates)/store/loading';

describe('StoreLoading', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<StoreLoading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});
