import { render } from '@testing-library/react';
import AppLoading from '@/app/(templates)/app/loading';

describe('AppLoading', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<AppLoading />);
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0
    );
  });
});
